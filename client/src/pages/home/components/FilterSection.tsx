import { CiFilter } from "react-icons/ci";
import { MdDeleteOutline } from "react-icons/md";
import { departmentsDropDown } from "../../../shared/utils/content";


interface FilterSectionProps {
  date: string;
  setDate: (date: string) => void;
  status: string;
  setStatus: (status: string) => void;
  department: string;
  setDepartment: (department: string) => void;
  setPage: (page: number) => void;
  handleDeleteNotice: () => void;
}

const FilterSection = ({
  date,
  setDate,
  status,
  setStatus,
  department,
  setDepartment,
  setPage,
  handleDeleteNotice,
}: FilterSectionProps) => {
  return (
    <div className="w-full flex @6xl:flex-row flex-col @6xl:items-center justify-between sm:py-4 py-2.5">
      <h2 className="md:text-lg m  @6xl:w-[30%] 6xl:pb-0 pb-2 pt-2 font-semibold text-[#0A0A0A]">
        Fitlers By :
      </h2>

      <div className="grid @6xl:grid-cols-4 @5xl:grid-cols-3 @md:grid-cols-2 items-center gap-3">
        <input
          className="w-full cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm outline-none"
          type="date"
          value={date}
          onChange={(e) => {
            setPage(1);
            setDate(e.target.value);
          }}
        />

        <select
          className="w-full cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm outline-none"
          value={status}
          onChange={(e) => {
            setPage(1);
            setStatus(e.target.value);
          }}
        >
          <option value="">Select Status</option>
          <option>Published</option>
          <option>Unpublished</option>
          <option>Draft</option>
        </select>

        <select
          className="w-full cursor-pointer rounded-md border border-gray-300 px-4 py-2 text-sm outline-none"
          value={department}
          onChange={(e) => {
            setPage(1);
            setDepartment(e.target.value);
          }}
        >
          <option value="">Select Department</option>
          {departmentsDropDown?.map((emp) => (
            <option key={emp}>{emp}</option>
          ))}
        </select>
        <div className="flex gap-2.5">
          <button
            onClick={() => {
              setDate("");
              setStatus("");
              setPage(1);
              setDepartment("");
            }}
            className="rounded-md flex gap-1 px-4 py-2 cursor-pointer border border-blue-500"
          >
            <CiFilter /> <span className="text-blue-500"> Reset</span>
          </button>
          <button
            onClick={handleDeleteNotice}
            className="rounded-md px-4 py-2 flex gap-1.5 cursor-pointer bg-red-500"
          >
            <span className="text-white">
              <MdDeleteOutline className="" />
            </span>
            <span className="text-white"> Delete</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FilterSection;