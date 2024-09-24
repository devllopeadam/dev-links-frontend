import { Reorder, useDragControls, useMotionValue } from "framer-motion";
import { useState } from "react";
import { getGrayIconForPlatform } from "../constants";
import { Link } from "../interfaces";
import DeleteLink from "./DeleteLink";
import ReorderIcon from "./IconReorder";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import UpdateLink from "./UpdateLink";

interface IProps {
  item: Link;
  hashId: number;
}

const CustmizeLink = ({ item, hashId }: IProps) => {
  const { id, platform, link, order } = item;
  const dragControls = useDragControls();
  const y = useMotionValue(0);
  const [open, setOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);


  return (
    <Reorder.Item
      value={item}
      id={item.id.toString()}
      style={{ y }}
      dragListener={false}
      dragControls={dragControls}
      className="p-5 bg-[#fafafa] rounded-lg flex flex-col gap-4 select-none">
      <div className="flex items-center gap-2">
        <ReorderIcon
          onPointerDown={(e) => dragControls.start(e)}
          className="w-5 h-5" />
        <p className="text-accent-gray font-semibold">Link <span className="font-bold">#{hashId}</span></p>
      </div>
      <div className="flex flex-col gap-4">
        <Input disabled={false} readOnly label="Platform" className="[&>div>input]:bg-white focus-visible:ring-[#e2e8f0]" icon={getGrayIconForPlatform(platform)} value={platform} />
        <Input disabled={false} readOnly label="Link" className="[&>div>input]:bg-white focus-visible:ring-[#e2e8f0]" icon={"/images/icon-link.svg"} value={link} />
      </div>
      <div className="flex items-center gap-2 self-end">
        <Button className="font-semibold" size={'sm'} onClick={() => setUpdateOpen(true)}>Update</Button>
        <Button variant={'destructive'} size={'sm'} className="font-semibold" onClick={() => setOpen(true)}>Remove</Button>
      </div>
      <DeleteLink open={open} setOpen={setOpen} id={id} />
      <UpdateLink updateOpen={updateOpen} setUpdateOpen={setUpdateOpen} linkN={{ platform, link, order, id }} />
    </Reorder.Item>
  )
}

export default CustmizeLink
