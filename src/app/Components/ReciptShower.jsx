import React, { useRef, useState, useEffect } from "react";
import RecieptLayout from "./RecieptLayout";
import { Icon } from "@iconify/react";
import * as htmlToImage from "html-to-image";
import Modal from "./Modal";

const ReciptShower = ({ data, buildingNo }) => {
  const [index, setIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredData, setFilteredData] = useState(data);
  const getDateInStringFormat = (date) => {
    const month = date
      .toLocaleString("default", { month: "long" })
      .toLowerCase();
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
    return `${month}'${year}`;
  };

  const [date, setDate] = useState(getDateInStringFormat(new Date(), "/"));
  const [openDateSelector, setOpenDateSelector] = useState(false);

  const receiptRefs = useRef({});

  useEffect(() => {
    const filtered = data.filter(
      (item) =>
        item?.roomNo?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (item?.Tenantname &&
          item?.Tenantname?.toLowerCase().includes(searchTerm.toLowerCase()))
    );
    setFilteredData(filtered);
    setIndex(0); // Reset index when search results change
  }, [searchTerm, data]);

  const handlePrevClick = () => {
    if (index > 0) {
      setIndex(index - 1);
    }
  };

  const handleNextClick = () => {
    if (index < filteredData.length - 1) {
      setIndex(index + 1);
    }
  };
 const downloadHandler = async (key, roomNo) => {
  const domEl = receiptRefs.current[key];
  if (!domEl) {
    console.error("Receipt element not found");
    return;
  }

  try {
    const dataUrl = await htmlToImage.toJpeg(domEl, {
      quality: 0.95,
      backgroundColor: "#ffffff", // 👈 forces white background
      style: {
        margin: 0,
        padding: 0,
      },
    });

    const link = document.createElement("a");
    link.download = `${roomNo}.jpeg`;
    link.href = dataUrl;
    link.click();
  } catch (error) {
    console.error("Error generating image:", error);
  }
};

  const downloadAllReceipts = async () => {
    for (let i = 0; i < filteredData.length; i++) {
      const item = filteredData[i];
      await new Promise((resolve) => {
        setIndex(i);
        setTimeout(async () => {
          await downloadHandler("main", item.roomNo);
          resolve();
        }, 500);
      });
    }
  };
  const handleDateChange = (event) => {
    const selectedDate = new Date(event.target.value);
    setDate(getDateInStringFormat(selectedDate));
    setOpenDateSelector(false);
  };

  return (
    <div>
      <div className="flex flex-col justify-center items-center ">
        {data.length > 0 && (
          <div className="w-full  gap-4 flex justify-around mb-4">
            {/* <h1 className="text-2xl font-bold">Total Rooms: {data.length}</h1> */}

            <div className="">
              <input
                type="text"
                placeholder="Search by tenant name or room number"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="p-2 h-[50px] border border-purple-400 rounded-2xl "
              />
            </div>
            <button
              className="bg-purple-700 text-white font-semibold p-3 rounded-2xl"
              onClick={downloadAllReceipts}
            >
              Download All Receipts
            </button>
          </div>
        )}
        <div className="">
          {filteredData.length > 0 ? (
            <div className="flex">
              <div ref={(el) => (receiptRefs.current["main"] = el)}>
                <RecieptLayout
                  date={date}
                  buildingNo={buildingNo}
                  data={filteredData[index]}
                />
              </div>
              <Icon
                onClick={() => {
                  setOpenDateSelector(true);
                }}
                height={25}
                icon="bx:edit"
              />
              <Icon
                className="cursor-pointer "
                onClick={() => {
                  downloadHandler("main", filteredData[index].roomNo);
                }}
                height={25}
                icon="material-symbols:download-sharp"
              />
            </div>
          ) : (
            <p className=" flex justify-center items-center outline-dotted outline-1 outline-gray-300 mt-12 h-[300px]  p-12">
              No receipts available.
            </p>
          )}
        </div>
      </div>
      <div className="flex justify-center items-center mt-4">
        <Icon
          onClick={handlePrevClick}
          className={`cursor-pointer ${
            index === 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
          height={30}
          icon="icon-park-outline:left-c"
        />
        <Icon
          onClick={handleNextClick}
          className={`cursor-pointer ${
            index === filteredData.length - 1
              ? "opacity-50 cursor-not-allowed"
              : ""
          }`}
          height={30}
          icon="icon-park-outline:right-c"
        />
      </div>
      <Modal
        isOpen={openDateSelector}
        onClose={() => {
          setOpenDateSelector(false);
        }}
      >
        <div className=" flex flex-col p-6">
          <h1 className=" font-bold text-[30px]">Please Select date</h1>
          <input
            onChange={handleDateChange}
            type="date"
            className=" mt-6 outline outline-1 outline-gray-500 rounded-lg p-2"
            placeholder="please select date"
          />
        </div>
      </Modal>
    </div>
  );
};

export default ReciptShower;
