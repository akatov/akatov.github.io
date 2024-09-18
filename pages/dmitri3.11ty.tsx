import React from "react";

export const data = {
  title: "Dmitri 3",
  layout: "MainLayout.11ty.tsx",
};

export function render(props: any) {
  // console.info("DMITRI3", { props });
  return (
    <>
      <h2 className="text-red-500">Dmitri 3</h2>
      <div className="bg-orange-100 text-blue-700">
        tsx inside a tsx template renders fine
      </div>
    </>
  );
}
