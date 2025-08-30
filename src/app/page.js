"use client";
import Image from "next/image";
import ExcelReader from "./Components/ExcelHandler";
import { useRef, useState } from "react";
import Card from "./Components/Card";
import Modal from "./Components/Modal";
import ExcelAccept from "./Components/ExcelAccept";
import Reciept from "./Components/Recipt";
import RecieptLayout from "./Components/RecieptLayout";
import ReciptShower from "./Components/ReciptShower";
import { Icon } from "@iconify/react";
import * as htmlToImage from "html-to-image";
import pink from "../../public/pink.jpg";

export default function Home() {
  const [modalOpen, SetModalOpen] = useState(true);
  const [showFileUpload, SetshowFileUpload] = useState(false);

  const [manualEnterData, SetmanualEnterData] = useState();
  const [buildingNo, SetBuildingNo] = useState();
  const [showManualDataModal, SetshowManualDataModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [recieptData, SetRecieptData] = useState([]);
  const receiptRefs = useRef({});

  const [showManualDataReceipt, SetshowManualDataReceipt] = useState(false);

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

  const OnclickHandler = (data) => {
    SetmanualEnterData(data);

    SetshowManualDataModal(false);
    SetModalOpen(false);

    SetshowManualDataReceipt(true);
  };

  // const filteredReceipts = dataReq.filter(item =>
  //   item?.Tenantname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   item?.roomNo?.toString().includes(searchTerm)
  // );

  const handlerUpload = () => {
    SetshowFileUpload(true);
  };

  const dataHandler = (data) => {
    SetRecieptData(data);
    SetModalOpen(false);
  };

  return (
    <div className="">
      <div className=" flex flex-col">
        <div className=" flex mt-12 mr-12 justify-center ">
          {/* <div className="   " >

      <Image alt=""  className=""  src={pink} height={90} width={100} />

      </div> */}

          <h1 className=" mb-9 ml-2 flex justify-center items-center text-pink-400 mt-5 text-3xl font-bold">
            Pink Stayz
          </h1>
        </div>

        <div className=" flex justify-center mt-4">
          <input
            className="p-4 rounded-2xl outline outline-1 w-[250px] outline-purple-500 "
            onChange={(e) => {
              SetBuildingNo(e.target.value);
            }}
            placeholder="Enter Title/Building Name"
          />
        </div>
      </div>

      {recieptData.length > 0 && (
        <div className=" flex justify-center items-center mt-4">
          {" "}
          <ReciptShower buildingNo={buildingNo} data={recieptData} />
        </div>
      )}

      <Modal
        isOpen={showManualDataReceipt}
        onClose={() => {
          SetModalOpen(true);
          SetshowManualDataReceipt(false);
        }}
      >
        {manualEnterData !== undefined && (
          <div>
            <div ref={(el) => (receiptRefs.current["main"] = el)}>
              <RecieptLayout data={manualEnterData} buildingNo={buildingNo} />
            </div>

            <Icon
              className="cursor-pointer "
              onClick={() => {
                downloadHandler("main", manualEnterData.roomNo);
              }}
              height={25}
              icon="material-symbols:download-sharp"
            />
          </div>
        )}
      </Modal>

      <Modal isOpen={modalOpen}>
        <h1 className=" text-3xl   text-center font-bold">Pink Stays</h1>

        <h1 className=" text-xl  text-gray-400 mt-2 text-center font-medium">
          Create your reciept through following options.
        </h1>

        <div className=" m-12 mt-24 flex  gap-7">
          <ExcelAccept dataHandler={dataHandler} />
          <Card
            onclick={() => {
              SetshowManualDataModal(true);
            }}
            title={"Manualy Enter"}
            subtitle={"Manualy enter deatils   for reciept generation."}
            src={
              "https://cdn.iconscout.com/icon/premium/png-512-thumb/data-entry-2173699-1831222.png?f=webp&w=512"
            }
          />
        </div>
      </Modal>

      <Modal
        isOpen={showFileUpload}
        onClose={() => {
          SetshowFileUpload(false);
        }}
      >
        <ExcelAccept dataHandler={dataHandler} />
      </Modal>

      <Modal
        isOpen={showManualDataModal}
        onClose={() => {
          SetshowManualDataModal(false);
        }}
      >
        <Reciept OnclickHandler={OnclickHandler} />
      </Modal>
    </div>
  );
}
