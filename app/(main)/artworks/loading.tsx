import { ArrowPathIcon } from "@heroicons/react/24/outline";
import React from "react";
const LoadingScreen: React.FC = () => {
    return (
        <div className="mt-20 flex flex-col items-center">
            <h1 className="mb-4 text-xl font-bold">در حال جستجو...</h1>
            <ArrowPathIcon className="h-10 w-10 animate-spin" />
        </div>
    );
};

export default LoadingScreen;
