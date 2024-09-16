import { useUserData } from "../context/UserDataContext";
import CustmizeLink from "./CustmizeLink";
import { ScrollArea } from "./ui/scroll-area";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const LinksHandler = () => {
  const { userData, setUserData } = useUserData();

  const handleOnDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(userData!.links);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setUserData((prev) => ({
      ...prev,
      user: {
        ...prev!.user,
      },
      links: items,
    }));
  };

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="links">
        {(provided) => (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            className="flex flex-col gap-5"
          >
            <ScrollArea className='h-[495px]'>
              {userData?.links.map((x, i) => (
                <Draggable key={x.platform} draggableId={x.platform} index={i}>
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      className="mb-5" // Add margin to separate items if needed
                    >
                      <CustmizeLink
                        link={x.link}
                        platform={x.platform}
                        id={x.id}
                        hashId={i + 1}
                        dragHandleProps={provided.dragHandleProps} // Pass dragHandleProps
                      />
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </ScrollArea>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default LinksHandler;
