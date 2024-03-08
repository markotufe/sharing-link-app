"use client";

import { Fragment, useState } from "react";
import Icon from "./Icon";
import { DropdownOption } from "@/types/components";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";

type DropdownProps = {
  options: DropdownOption[];
  selectedOption: DropdownOption | undefined;
  handleSelectOption: (option: DropdownOption) => void;
  label?: string;
};

export const Dropdown = ({
  options,
  selectedOption,
  handleSelectOption,
  label
}: DropdownProps) => {
  const [isDropdownVisible, setIsDropdownVisible] = useState(false);

  const handleToggleDropdownVisibility = (
    e: React.MouseEvent<HTMLDivElement>
  ) => {
    e.stopPropagation();
    setIsDropdownVisible((prev) => !prev);
  };

  return (
    <div
      role="button"
      onClick={handleToggleDropdownVisibility}
      className="text-darkGrey select-none relative"
    >
      {label && <p className={`text-sm text-darkGrey`}>{label}</p>}

      <div
        className={`mt-1 bg-white border rounded-md px-4 cursor-pointer h-[48px] flex items-center justify-between ${
          isDropdownVisible && "drop-shadow-input border border-purple"
        }`}
      >
        <span className="flex items-center">
          {selectedOption?.icon && <Icon name={selectedOption.icon} />}

          <span className={`${selectedOption?.label ? "ml-3" : "ml-0"}`}>
            {selectedOption?.label || "Select your option"}
          </span>
        </span>

        {isDropdownVisible ? (
          <ChevronUpIcon className="w-5 h-5 text-purple" />
        ) : (
          <ChevronDownIcon className="w-5 h-5 text-purple" />
        )}
      </div>
      {isDropdownVisible && (
        <ul className="px-4 mt-3 bg-white rounded-md drop-shadow-md p-4 space-y-3 absolute z-20 w-full">
          {options.map((item, index, { length }) => (
            <Fragment key={item.value}>
              <li
                value={item.value}
                onClick={() => handleSelectOption(item)}
                className={`${
                  item.label === selectedOption?.label
                    ? "text-purple"
                    : "text-darkGrey"
                } flex items-center`}
              >
                {item.icon && <Icon name={item.icon} />}
                <span className="ml-3">
                  {item.label}{" "}
                  {item.label === selectedOption?.label && "(Selected)"}
                </span>
              </li>
              {index < length - 1 && <hr />}
            </Fragment>
          ))}
        </ul>
      )}
    </div>
  );
};
