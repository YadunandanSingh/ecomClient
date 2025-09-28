import React from "react";

export default function OrderTrack({ currentStatus }) {
  // Define all possible steps in order
  const steps = [
    "Pending",
    "Confirmed",
    "Shipped",
    "Delivered",
    ,
  ];

  // Find current step index
  const currentIndex = steps.indexOf(currentStatus);

  return (
    <section className="  sm:py-6  rounded-md  font-[Montserrat] text-[#2c3e50] max-w-5xl mx-auto">
      <div
        className="
          flex flex-col gap-8 md:gap-0 mt-6
          md:flex-row md:justify-between md:items-start
          border-t border-dashed border-[#2c3e50] pt-6
        "
      >
        {steps.map((step, index) => {
          const isCompleted = index < currentIndex;
          const isCurrent = index === currentIndex;

          return (
            <div
              key={index}
              className={`
                flex md:flex-col items-center md:items-center relative
                ${index !== steps.length - 1 ? "md:flex-1" : ""}
              `}
            >
              {/* Dot + line */}
              <div className="flex items-center md:flex-col">
                {/* Dot */}
                <span
                  className={`md:absolute md:-top-3.5
                    block w-6 h-6 md:w-8 md:h-8 rounded-full z-10
                    ${isCompleted ? "bg-[#f05a00]" : isCurrent ? "bg-[#f05a00]" : "bg-gray-300"}
                  `}
                ></span>

               
              </div>
 {/* Connector line */}
                {index !== steps.length - 1 && (
                  <span
                    className={`
                      absolute md:absolute
                      ${"md:w-full md:h-[2px] w-[2px] h-16"}
                      ${isCompleted || isCurrent ? "bg-[#f05a00]" : "bg-gray-300"}
                      ${"md:top-[28px] md:right-[50%] md:translate-y-[-50%]"}
                      ${"top-[28px] left-[11px] md:static"}
                    `}
                  ></span>
                )}
              {/* Text */}
              <div className="ml-6 md:ml-0 md:mt-8 text-center">
                <p
                  className={`text-sm md:text-base font-medium ${
                    isCurrent ? "text-[#f05a00]" : ""
                  }`}
                >
                  {step == 'Pending' ? 'Order Resived' : step}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
