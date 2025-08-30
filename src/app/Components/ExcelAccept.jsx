"use client";
import React, { useRef, useState } from "react";
import * as XLSX from "xlsx";
import * as htmlToImage from "html-to-image";
import { Icon } from "@iconify/react";

const ALLOWED_FILE_TYPES = [
  "xlsx",
  "xlsb",
  "xlsm",
  "xls",
  "xml",
  "csv",
  "txt",
  "ods",
  "fods",
  "uos",
  "sylk",
  "dif",
  "dbf",
  "prn",
  "qpw",
  "123",
  "wb*",
  "wq*",
  "html",
  "htm",
]
  .map((x) => `.${x}`)
  .join(",");

const make_cols = (refstr) => {
  const C = XLSX.utils.decode_range(refstr).e.c + 1;
  return Array.from({ length: C }, (_, i) => ({
    name: XLSX.utils.encode_col(i),
    key: i,
  }));
};

const ExcelAccept = ({ dataHandler }) => {
  const [file, setFile] = useState(null);
  const [data, setData] = useState([]);
  const [cols, setCols] = useState([]);
  const [sheetName, setSheetName] = useState("");
  // const [dataReq, setDataReq] = useState([]);
  // const [searchTerm, setSearchTerm] = useState("");
  const receiptRefs = useRef({});

  // const filteredReceipts = dataReq.filter(item =>
  //   item?.Tenantname?.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //   item?.roomNo?.toString().includes(searchTerm)
  // );

  const handleChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      processFile(selectedFile);
    }
  };

  const processFile = (file) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const bstr = e.target.result;
      const wb = XLSX.read(bstr, { type: "binary", bookVBA: true });
      const wsname = wb.SheetNames[0];
      setSheetName(wsname);
      const ws = wb.Sheets[wsname];
      const data = XLSX.utils.sheet_to_json(ws);
      setData(data);
      setCols(make_cols(ws["!ref"]));
      processData(data);

      console.log("datae", data);
    };
    reader.readAsBinaryString(file);
  };

  const processData = (data) => {
    const getFirstKey = (obj) => Object.keys(obj)[0];
    const firstKeyValues = data.slice(2).map((obj) => obj[getFirstKey(obj)]);

    const updatedDataReq = data.slice(2).map((item, index) => ({
      Tenantname: item?.__EMPTY_1,
      roomNo: firstKeyValues[index],
      PhoneNumber: item?.__EMPTY_2 ?? 0,
      OldMeterReading: item?.__EMPTY_10 ?? 0,
      NewMeterReading: item?.__EMPTY_11 ?? 0,
      AgreementNumber: item?.__EMPTY_4 ?? 0,
      Rent: item?.__EMPTY_9 ?? 0,
      UnitUsed: item?.__EMPTY_12 ?? 0,
      BillAmount: item?.__EMPTY_14 ?? 0,
      TotalAmount: item?.__EMPTY_18 ?? 0,
      Maintaince: item?.__EMPTY_15 ? item?.__EMPTY_15 : 0,
      securityDeposit: item?.__EMPTY_8 ? item?.__EMPTY_8 : 0,
      advanceAmount: item?.__EMPTY_20 ? item?.__EMPTY_20 : 0,
      prevBalance: item?.__EMPTY_16 ? item?.__EMPTY_16 : 0,
    }));

    console.log(updatedDataReq);

    dataHandler(updatedDataReq);

    // setDataReq(updatedDataReq);
  };

  const downloadHandler = async (key, roomNo) => {
    const domEl = receiptRefs.current[key];
    if (!domEl) {
      console.error("Receipt element not found");
      return;
    }

    try {
      const dataUrl = await htmlToImage.toPng(domEl);
      const link = document.createElement("a");
      link.download = `${roomNo}.png`;
      link.href = dataUrl;
      link.click();
    } catch (error) {
      console.error("Error generating image:", error);
    }
  };

  const downloadAllReceipts = async () => {
    for (let key in receiptRefs.current) {
      const item = dataReq[key];
      if (item) {
        await downloadHandler(key, item.roomNo);
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex w-[300px] justify-center items-center outline-1 outline-dashed hover:shadow-2xl rounded-xl outline-purple-400 p-3 flex-col">
        <label
          htmlFor="file-upload"
          className="flex justify-center items-center outline outline-1 mt-12 hover:shadow-2xl outline-purple-400 p-3 rounded-[50%] flex-col cursor-pointer"
        >
          <Icon
            icon="uil:plus"
            id="file"
            className="text-purple-600"
            height={50}
          />
        </label>
        <h1 className="mt-3 text-base font-medium">Upload Files</h1>
        <input
          id="file-upload"
          accept={ALLOWED_FILE_TYPES}
          onChange={handleChange}
          type="file"
          className="hidden"
        />
        {sheetName && (
          <h1 className="mt-4 font-medium">Selected File: {sheetName}</h1>
        )}
      </div>
    </div>
  );
};

export default ExcelAccept;
