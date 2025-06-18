export default function HabitTag({
  color,
  text,
}: {
  color: string;
  text: string;
}) {
  const HabitTag = ({ color, text }: { color: string; text: string }) => (
    <button
      type="button"
      className="shadow-md flex items-center gap-2 border-2 bg-white border-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
    >
      <span className={`w-4 h-4 bg-${color}-500 rounded-full`}></span>
      <span className="text-gray-700">{text}</span>
      <TrashIcon className="h-4 w-4 text-gray-500" />
    </button>
  );
}
