import { motion } from "framer-motion";

interface IProps {
  text: string;
  isOpen: boolean;
}

const Hover = ({ text, isOpen }: IProps) => {
  return isOpen && (
    <motion.div
      initial={{ scale: 0.7, y: 10 }}
      animate={{ scale: 1, y: 0 }}
      className="bg-white text-nowrap p-1 px-2 rounded-md shadow-sm absolute -top-10 -left-1/2 -translate-x-1/2 text-black text-[14px] font-medium">
      {text}
    </motion.div> 
  )
}

export default Hover
