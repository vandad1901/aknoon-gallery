"use client";

import React from "react";
const LoadingScreen: React.FC = () => {
    return (
        <div className="mt-20 flex flex-col items-center">
            <h1 className="mb-4 text-xl font-bold">
                خطا در پیدا کردن آثار. لطفا بعدا امتحان کنید{" "}
            </h1>
        </div>
    );
};

export default LoadingScreen;
