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

  const handleRandomSelection = () => {
    if (availableNumbers.length === 0) {
      alert("تمام اعداد انتخاب شده‌اند!");
      return;
    }

    setLoading(true);
    let count = 0;
    const interval = setInterval(() => {
      setRandomNumber(count + 1);
      count++;
      if (count === 20) {
        clearInterval(interval);
        finalizeSelection();
      }
    }, 200);
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

  const deleteUserHandler = (id: number) => {
    const userToDelete = users.find((user) => user.id === id);
    if (!userToDelete) return;

    const updatedUsers = users.map((user) =>
      user.id === id ? { ...user, situation: false } : user,
    );

    const newAvailableNumbers = availableNumbers.filter(
      (num) => num !== userToDelete.number,
    );

    setUsers(updatedUsers);
    setAvailableNumbers(newAvailableNumbers);
  };

  const miladSelecter = () => {};

  return (
    <div className="mt-5">
      <div className="mx-8 mt-5 mb-8 flex items-center justify-between">
        <button
          onClick={handleRandomSelection}
          className="rounded-md bg-blue-500 px-4 py-4 text-lg font-semibold text-white active:bg-red-500"
          disabled={loading}
        >
          انتخاب عدد تصادفی
        </button>

        <div className="flex items-center gap-2 text-xl font-semibold text-blue-950">
          <p>عدد انتخابی : </p>
          <span className="text-red-500">
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
            className="relative flex w-[80%] flex-col items-center justify-center rounded-md border-2 border-solid border-blue-500 pt-2 pb-4"
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
              className="w-[8rem] rounded-full border-2 border-solid border-blue-500"
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
              onClick={() => deleteUserHandler(item.id)}
              className="mt-3 rounded-md bg-red-500 px-5 py-3 text-sm text-white"
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
