"use client";

const Checkbox = ({ status, setStatus }: any) => {
  return (
    <div
      className={`box mr-4 flex h-5 w-5 items-center justify-center rounded border cursor-pointer border-primary ${status ? 'bg-success' : "bg-warning"
        }`}
      onClick={() => setStatus(!status)}
    >

    </div>
  );
};

export default Checkbox;
