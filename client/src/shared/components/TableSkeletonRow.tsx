export const TableSkeletonRow = () => {
  return (
    <tr className="border-b border-b-gray-300 animate-pulse">
      <td className="md:p-4 p-2">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-300 rounded" />
          <div className="h-4 w-32 md:w-48 bg-gray-300 rounded" />
        </div>
      </td>

      <td className="md:p-4 p-2">
        <div className="h-4 w-24 bg-gray-300 rounded" />
      </td>

      <td className="md:p-4 p-2">
        <div className="h-4 w-32 bg-gray-300 rounded" />
      </td>

      <td className="md:p-4 p-2">
        <div className="h-4 w-24 bg-gray-300 rounded" />
      </td>

      <td className="md:p-4 p-2">
        <div className="h-6 w-20 bg-gray-300 rounded-full" />
      </td>

      <td className="md:p-4 p-2">
        <div className="flex gap-3">
          <div className="h-5 w-5 bg-gray-300 rounded" />
          <div className="h-5 w-5 bg-gray-300 rounded" />
        </div>
      </td>
    </tr>
  );
};
