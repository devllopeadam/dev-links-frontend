import IconEmptyLinks from "@/public/images/illustration-empty.svg";
import { motion } from "framer-motion";

const EmptyLinks = () => {
  return (
    <motion.div initial={{ opacity: 0, scale: 0.7 }} animate={{ opacity: 1, scale: 1 }} className="flex flex-col gap-6 bg-[#fafafa] py-14 items-center rounded-lg">
      <IconEmptyLinks />
      <div className="flex flex-col gap-1 items-center">
        <h1 className="text-dark-gray text-[32px] font-bold">Let's get you started</h1>
        <p className="text-accent-gray max-w-[500px] text-center">Use the “Add new link” button to get started. Once you have more
          than one link, you can reorder and edit them. We’re here to help
          you share your profiles with everyone!</p>
      </div>
    </motion.div>
  )
}

export default EmptyLinks
