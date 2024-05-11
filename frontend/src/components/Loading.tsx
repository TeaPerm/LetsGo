import { Ring } from "@uiball/loaders";

const Loading = () => {
  return (
    <div className="flex mt-24 justify-center w-full">
      <Ring size={32} lineWeight={8} speed={2} color="yellow" />
    </div>
  );
};

export default Loading;
