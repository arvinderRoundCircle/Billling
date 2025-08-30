import { Icon } from "@iconify/react";
import Image from "next/image";
import React, { useState } from "react";
import sign from "../../../public/sign.jpg";
// import sign from "../../public/sign.jpg"
import pink from "../../../public/pink.jpg";

const RecieptLayout = ({ buildingNo, data, date }) => {
  const getDateInStringFormat = (date) => {
    const month = date
      .toLocaleString("default", { month: "long" })
      .toLowerCase();
    const year = date.getFullYear().toString().slice(-2); // Get the last two digits of the year
    return `${month}'${year}`;
  };

  const getDateInStringFormat2 = (date, sign) => {
    return `${date.getDate()}${sign}${
      date.getMonth() + 1
    }${sign}${date.getFullYear()}`;
  };

  return (
    <div className="   flex justify-center  rounded-xl  w-[760px]  min-h-[400px] ">
      <div className="   flex gap-3 ">
        <div className=" bg-gray-50 outline outline-1 w-full outline-gray-400">
          <div className=" flex  w-full     border-b-2  border-y-gray-400 justify-evenly">
            <div className=" flex justify-center items-center">
              {/* <Icon height={45} icon="material-symbols-light:house-outline" /> */}
              <Image alt="" src={pink} width={100} />
            </div>

            <div className=" m-2 min-w-[300px] flex justify-center  flex-col items-center outline p-2  outline-1 outline-gray-400 rounded-2xl">
              <h1 className=" font-bold text-2xl">{buildingNo} </h1>
              <h1> DLF PHASE III, GURGAON</h1>
            </div>
            {/* <h1>{buildingNo}  DLF PHASE III, GURGAON</h1> */}

            <div className=" flex justify-center items-center border-l-2 border-y-gray-400 p-2">
              <Icon height={30} icon="carbon:phone" />
              <div className=" flex flex-col ml-2">
                {/* <h1 className=" text-base font-bold">9466399785</h1> */}
                <h1 className=" text-sm font-bold">9818862972</h1>
                <h1 className=" text-sm font-bold">9466399785</h1>
              </div>
            </div>
          </div>

          <div className=" grid grid-cols-2 mt-6 gap-3   border-b-2 border-gray-400 ">
            <div className=" ml-2  flex justify-start outline outline-1  max-w-[250px] outline-gray-500 p-1 rounded-lg">
              <h1 className=" text-base font-bold  ">
                Name : {data?.Tenantname}{" "}
              </h1>
            </div>

            <div className="   flex mr-1 justify-start outline outline-1  max-w-[250px] outline-gray-500 p-1 rounded-lg">
              <h1 className=" text-base font-bold  ">
                Phone No. : {data?.PhoneNumber}{" "}
              </h1>
            </div>

            <div className="  ml-2 mb-4  flex justify-start outline outline-1  max-w-[250px] outline-gray-500 p-1 rounded-lg">
              <h1 className=" text-base font-bold  ">
                Room No. : {data?.roomNo}{" "}
              </h1>
            </div>

            <div className=" mb-4  mr-1 flex justify-start outline outline-1  max-w-[250px] outline-gray-500 p-1 rounded-lg">
              <h1 className=" text-base font-bold  ">Month : {date}</h1>
            </div>
          </div>

          <div className="  mt-3  border-b-2 text-center flex justify-center border-gray-400 ">
            <h1 className=" font-semibold  mb-2 text-base ">DETAILS</h1>
          </div>

          <div className=" flex">
            <div className=" grid grid-cols-1 gap-2  w-[50%] mt-4 mr-2 ">
              <div className=" ml-2  flex justify-start   outline outline-1  max-w-[250px] outline-gray-500 p-[2px] rounded-lg">
                <h1 className=" text-base font-bold   ">
                  Rent @charges : ₹{data?.Rent}{" "}
                </h1>
              </div>

              <div className=" ml-2  flex justify-start    outline outline-1  max-w-[250px] outline-gray-500 p-[2px] rounded-lg">
                <h1 className=" text-base font-bold  ">
                  Security Deposit : ₹{data?.securityDeposit}{" "}
                </h1>
              </div>

              <div className=" ml-2  flex flex-col justify-start mb-2   outline outline-1  max-w-[250px] outline-gray-500 p-[2px] rounded-lg">
                <h1 className=" text-base font-bold ml-2  mb-2 ">
                  Electrical Charges :{" "}
                </h1>

                <div className=" flex flex-col gap-2">
                  <div className=" ml-6  flex justify-start    outline outline-1  max-w-[250px] outline-gray-500 p-[2px] rounded-sm mr-1">
                    <h1 className=" text-sm font-medium  ">
                      Old Reading : {data?.OldMeterReading}{" "}
                    </h1>
                  </div>
                  <div className=" ml-6  flex justify-start    outline outline-1  max-w-[250px] outline-gray-500 p-[2px] rounded-sm mr-1">
                    <h1 className=" text-sm font-medium  ">
                      New Reading : {data?.NewMeterReading}{" "}
                    </h1>
                  </div>
                  <div className=" ml-6  flex justify-start    outline outline-1  max-w-[250px] outline-gray-500 p-[2px] rounded-sm mr-1">
                    <h1 className=" text-sm font-medium  ">
                      Unit Used : {data?.UnitUsed}
                    </h1>
                  </div>
                  <div className=" ml-6  mb-1 flex justify-start    outline outline-1  max-w-[250px] outline-gray-500 p-[2px] rounded-sm mr-1">
                    <h1 className=" text-sm font-medium  ">
                      Amount : ₹{data?.BillAmount}{" "}
                    </h1>
                  </div>
                </div>
              </div>

              <div>
                <div className=" ml-2  flex justify-start    outline outline-1  max-w-[250px] outline-gray-500 p-[2px] rounded-lg">
                  <h1 className=" text-base font-bold   ">
                    Previous Balance : ₹{data?.prevBalance}{" "}
                  </h1>
                </div>

                <div></div>

                <div className=" ml-2 mt-4 flex justify-start   mb-5 outline outline-1  max-w-[250px] outline-gray-500 p-[2px] rounded-lg">
                  <h1 className=" text-base font-bold   ">
                    Maintaince : ₹{data?.Maintaince}
                  </h1>
                </div>
              </div>
            </div>

            <div className=" text-base font-semibold w-1/2 mr-2 ">
              <div className=" flex flex-col">
                <div className=" ml-2 mt-4 flex justify-start flex-col   outline outline-1  max-w-[250px] outline-gray-500 p-[2px] rounded-lg">
                  <h1 className=" text-base font-bold   ">
                    Total Amount : ₹{data?.TotalAmount}
                  </h1>

                  <div className=" ml-2 mt-4 flex justify-start   mb-5 outline outline-1  max-w-[250px] outline-gray-500 p-[2px] rounded-lg">
                    <h1 className=" text-base font-bold   ">
                      {" "}
                      Advance : ₹{data?.advanceAmount}
                    </h1>
                  </div>

                  <div className=" ml-2  flex justify-start   mb-5 outline outline-1  max-w-[250px] outline-gray-500 p-[2px] rounded-lg">
                    <h1 className=" text-base font-bold   ">
                      {" "}
                      Net Due : ₹{data?.TotalAmount - data?.advanceAmount}
                    </h1>
                  </div>
                </div>
              </div>

              <div className=" mt-20">
                <div className=" flex justify-center">
                  <Image height={140} width={100} alt=" " src={sign} />
                </div>

                <h1 className=" text-center font-bold   ">
                  Authorised Signatory
                </h1>
                <h1 className=" text-center font-bold   ">
                  Date: {getDateInStringFormat2(new Date(), "/")}{" "}
                </h1>
              </div>
            </div>
          </div>
          <div className=" ml-2 mr-2  mb-4 flex justify-center  outline outline-1   text-center outline-gray-500 p-[2px] rounded-lg">
            <ol spellCheck>
              <li className=" text-base text-c  font-bold">
                {" "}
                <span className="  text-red-500"> ₹100 </span> will be charged
                per day if rent is not paid bt 3rd of Month.
              </li>
              <li className=" text-base  font-bold">
                Maintance charge will be on vocation of Room as per maintaince
                of Room.
              </li>
              <li className=" text-sm  font-bold">
                Please send/whatsapp on 9466399785 for the payment made
                online/cash against this slip.
              </li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecieptLayout;
