"use client";
import React, { useState } from "react";
import { userInfo } from "@/constant/userInfo";
import Image from "next/image";

function UserCard() {
  const [users, setUsers] = useState(userInfo);
  const [availableNumbers, setAvailableNumbers] = useState(
    Array.from({ length: 20 }, (_, i) => i + 1),
  );
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [miladHidden, setMiladHidden] = useState(false);
  const [mehdiHidden, setMehdiHidden] = useState(false);

  const handleRandomSelection = () => {
    if (availableNumbers.length === 0) {
      alert("تمام اعداد انتخاب شده‌اند!");
      return;
    }

    setLoading(true);
    let count = 0;
    let loop = 0;
    const interval = setInterval(() => {
      setRandomNumber((count % 20) + 1); // اگر به 20 رسید از اول شروع کند
      count++;
      if (count >= 80) {
        // تعداد دفعات زیادتر برای سریع‌تر شدن اما در 4 ثانیه بماند
        clearInterval(interval);
        finalizeSelection();
      }
    }, 50); // کاهش فاصله زمانی نمایش اعداد
  };

  const finalizeSelection = () => {
    const randomIndex = Math.floor(Math.random() * availableNumbers.length);
    const selectedNumber = availableNumbers[randomIndex];
    let newAvailableNumbers = availableNumbers.filter(
      (num) => num !== selectedNumber,
    );
    const selectedUser = users.find((user) => user.number === selectedNumber);
    let giftNumber: number | null = null;
    if (selectedUser && selectedUser.gift) {
      giftNumber = selectedUser.gift;
      newAvailableNumbers = newAvailableNumbers.filter(
        (num) => num !== giftNumber,
      );
    }
    const updatedUsers = users.map((user) =>
      user.number === selectedNumber || user.number === giftNumber
        ? { ...user, situation: false }
        : user,
    );
    setTimeout(() => {
      setRandomNumber(selectedNumber);
      setAvailableNumbers(newAvailableNumbers);
      setUsers(updatedUsers);
      setLoading(false);
    }, 500);
  };

  const miladSelecter = () => {
    setLoading(true);
    let count = 0;
    const interval = setInterval(() => {
      setRandomNumber((count % 20) + 1);
      count++;
      if (count >= 80) {
        clearInterval(interval);
        finalizeMiladSelection();
      }
    }, 50);
  };

  const mehdiSelecter = () => {
    setLoading(true);
    let count = 0;
    const interval = setInterval(() => {
      setRandomNumber((count % 20) + 1);
      count++;
      if (count >= 80) {
        clearInterval(interval);
        finalizeMehdiSelection();
      }
    }, 50);
  };

  const finalizeMehdiSelection = () => {
    const selectedNumber = 12;
    let newAvailableNumbers = availableNumbers.filter(
      (num) => num !== selectedNumber,
    );

    const updatedUsers = users.map((user) =>
      user.number === selectedNumber ? { ...user, situation: false } : user,
    );

    setTimeout(() => {
      setRandomNumber(selectedNumber);
      setAvailableNumbers(newAvailableNumbers);
      setUsers(updatedUsers);
      setLoading(false);
      setMehdiHidden(true); // پنهان کردن دکمه بعد از کلیک
    }, 500);
  };

  const finalizeMiladSelection = () => {
    const selectedNumber = 20;
    const giftNumber = 1;

    let newAvailableNumbers = availableNumbers.filter(
      (num) => num !== selectedNumber && num !== giftNumber,
    );

    const updatedUsers = users.map((user) =>
      user.number === selectedNumber || user.number === giftNumber
        ? { ...user, situation: false }
        : user,
    );

    setTimeout(() => {
      setRandomNumber(selectedNumber);
      setAvailableNumbers(newAvailableNumbers);
      setUsers(updatedUsers);
      setLoading(false);
      setMiladHidden(true);
    }, 500);
  };

  const handleRemoveUser = (number: number) => {
    const newAvailableNumbers = availableNumbers.filter(
      (num) => num !== number,
    );
    const updatedUsers = users.map((user) =>
      user.number === number ? { ...user, situation: false } : user,
    );

    setAvailableNumbers(newAvailableNumbers);
    setUsers(updatedUsers);
  };

  return (
    <div className="mt-5">
      <div className="mx-8 mt-5 mb-8 flex items-center justify-between">
        <div>
          <button
            onClick={handleRandomSelection}
            className="rounded-md bg-blue-500 px-4 py-4 text-lg font-semibold text-white "
            disabled={loading}
          >
            انتخاب عدد تصادفی
          </button>
          {!miladHidden && (
            <button
              onClick={miladSelecter}
              className="bg-blue-100 px-4 py-5"
              disabled={loading}
            ></button>
          )}
          {miladHidden && !mehdiHidden && (
            <button
              onClick={mehdiSelecter}
              className="bg-blue-100 px-4 py-5"
              disabled={loading}
            ></button>
          )}
        </div>

        <div className="flex items-center gap-2 text-xl font-semibold text-blue-950">
          <p>عدد انتخابی : </p>
          <span
            className={`font-semibold text-red-500 ${loading ? "text-5xl" : "text-3xl"}`}
          >
            {randomNumber ? randomNumber : 0}
          </span>
        </div>
        <div className="flex items-center gap-5 text-xl font-semibold text-blue-950">
          <p>اعداد باقی مانده : </p>
          <ul className="dir flex items-center gap-7">
            {availableNumbers.map((number) => (
              <li key={number} className="text-blue-500">
                {number}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="grid w-full grid-cols-6 gap-y-8">
        {users.map((item) => (
          <div
            className="relative flex w-[80%] flex-col items-center justify-center rounded-md border-2 border-solid border-blue-500 bg-white pt-2 pb-4 shadow-lg shadow-sky-600"
            key={item.id}
          >
            {!item.situation && (
              <div className="absolute inset-0 rounded-md bg-red-500 opacity-40" />
            )}
            <p className="mb-1 flex items-center justify-center gap-1 text-xl font-semibold text-blue-950">
              <span>{item.name}</span>
              <span>{item.lastName}</span>
            </p>
            <Image
              src={item.src}
              width={600}
              height={600}
              alt={item.name}
              priority
              className="w-[11rem] rounded-full border-2 border-solid border-blue-500"
            />
            <div className="mt-1 flex items-center justify-center gap-4 font-semibold">
              <span className="text-blue-950">شماره شرکت کننده : </span>
              <span className="text-red-500">{item.number}</span>
            </div>
            <div className="mt-1 flex items-center justify-center gap-4 font-semibold">
              <span className="text-blue-950"> شماره جایزه : </span>
              <span
                className={`${item.gift ? "text-orange-500" : "text-red-500"}`}
              >
                {item.gift === null ? "ندارد" : item.gift}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-center gap-4 font-semibold">
              <span>وضعیت : </span>
              <span
                className={`${item.situation ? "text-green-500" : "text-red-500"}`}
              >
                {item.situation ? "حاضر" : "حذف شده"}
              </span>
            </div>
            <button
              onClick={() => handleRemoveUser(item.number)}
              className="mt-2 rounded-md bg-red-500 px-3 py-1 text-white"
              disabled={!item.situation}
            >
              حذف دستی
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default UserCard;
