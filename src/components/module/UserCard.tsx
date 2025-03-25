"use client";
import React, { useState } from "react";
import { userInfo } from "@/constant/userInfo";
import Image from "next/image";

function UserCard() {
  const [users, setUsers] = useState(userInfo);
  const [availableNumbers, setAvailableNumbers] = useState(
    Array.from({ length: 20 }, (_, i) => i + 1),
  );
  const [randomNumber, setRandomNumber] = useState<number | null>(null); // ذخیره عدد تصادفی انتخاب شده

  // select number button
  const handleRandomSelection = () => {
    if (availableNumbers.length === 0) {
      alert("تمام اعداد انتخاب شده‌اند!");
      return;
    }

    // انتخاب عدد تصادفی
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const selectedNumber = availableNumbers[randomIndex];

    // حذف عدد انتخاب شده از لیست
    let newAvailableNumbers = availableNumbers.filter(
      (num) => num !== selectedNumber,
    );

    // بروزرسانی وضعیت کاربران و تغییر وضعیت "حاضر" به "حذف شده"
    const updatedUsers = users.map((user) =>
      user.number === selectedNumber ? { ...user, situation: false } : user,
    );

    // اگر کاربر gift داشته باشد، عدد هدیه هم از لیست اعداد حذف شود
    const selectedUser = users.find((user) => user.number === selectedNumber);
    if (selectedUser && selectedUser.gift) {
      newAvailableNumbers = newAvailableNumbers.filter(
        (num) => num !== selectedUser.gift,
      );
    }

    setRandomNumber(selectedNumber); // ذخیره عدد تصادفی انتخاب شده
    setAvailableNumbers(newAvailableNumbers); // بروزرسانی لیست اعداد
    setUsers(updatedUsers); // بروزرسانی کاربران
  };

  return (
    <div className="mt-5">
      <div className="mx-3 mt-5 mb-8 flex items-center justify-between">
        {/* دکمه برای انتخاب عدد تصادفی */}
        <button
          onClick={handleRandomSelection}
          className="rounded-md bg-blue-500 px-4 py-2 text-white"
        >
          انتخاب عدد تصادفی
        </button>
        {/* نمایش عدد انتخاب شده */}
        {randomNumber !== null && (
          <div className="flex items-center gap-2 text-xl font-semibold text-blue-950">
            <p>عدد انتخاب شده : </p>
            <span className="text-red-500">{randomNumber}</span>
          </div>
        )}
        {/* نمایش لیست اعداد باقی‌مانده */}
        <div className="flex items-center gap-5 text-xl font-semibold text-blue-950">
          <p>لیست اعداد باقی‌مانده : </p>
          <ul className="dir flex items-center gap-7">
            {availableNumbers.map((number) => (
              <li key={number} className="text-blue-500">
                {number}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="grid w-full grid-cols-5 gap-y-8">
        {users.map((item) => (
          <div
            className="relative flex w-[90%] flex-col items-center justify-center rounded-md border-2 border-solid border-blue-500 py-12 pt-2"
            key={item.id}
          >
            {/* لایه قرمز شفاف برای کارت‌های انتخاب شده */}
            {item.number === randomNumber &&  (
              <div className="absolute inset-0 rounded-md bg-red-500 opacity-40" />
            )}
            {/* name & lastName */}
            <p className="mb-3 flex items-center justify-center gap-1 text-xl font-semibold text-blue-950">
              <span>{item.name}</span>
              <span>{item.lastName}</span>
            </p>
            {/* profile picture */}
            <Image
              src={item.src}
              width={600}
              height={600}
              alt={item.name}
              priority
              className="w-[13rem] rounded-full border-2 border-solid border-blue-500"
            />
            {/* number */}
            <div className="mt-3 flex items-center justify-center gap-4 text-xl font-semibold">
              <span className="text-blue-950">شماره شرکت کننده : </span>
              <span className="text-red-500">{item.number}</span>
            </div>
            <div className="mt-3 flex items-center justify-center gap-4 text-xl font-semibold">
              <span className="text-blue-950"> شماره جایزه : </span>
              <span
                className={`${item.gift ? "text-orange-500" : "text-red-500"}`}
              >
                {item.gift === null ? "ندارد" : item.gift}
              </span>
            </div>
            {/* situation */}
            <div className="mt-3 flex items-center justify-center gap-4 text-xl font-semibold">
              <span>وضعیت : </span>
              <span
                className={`${item.situation ? "text-green-500" : "text-red-500"}`}
              >
                {item.situation ? "حاضر" : "حذف شده"}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCard;
