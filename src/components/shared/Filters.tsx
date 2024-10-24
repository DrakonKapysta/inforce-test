"use client";
import { useAppDispatch, useAppSelector } from "@/hooks/reduxHooks";
import { changeFilter } from "@/redux/features/filter/filterSlice";
import { selectActiveFilter } from "@/redux/features/selectors";

const Filters = () => {
  const dispatch = useAppDispatch();
  const filter = useAppSelector(selectActiveFilter);
  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as "Alphabetical" | "Count";
    dispatch(changeFilter(value));
  };

  return (
    <select
      className="border rounded-md p-1 border-gray-500 focus:outline-none focus:border-blue-500"
      value={filter}
      onChange={handleChange}
    >
      <option value={"Alphabetical"}>Alphabetical</option>
      <option value={"Count"}>Count</option>
    </select>
  );
};

export default Filters;
