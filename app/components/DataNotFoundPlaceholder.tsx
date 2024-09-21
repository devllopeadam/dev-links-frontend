type TProps = "image" | "links" | "email" | "name" | "fullname";

const DataNotFoundPlaceholder = (type: TProps) => {
  switch (type) {
    case "image":
      return <div className="w-[115px] h-[115px] bg-gray-200 rounded-full mx-auto" />
    case "links":
      return <>
        <div className="h-11 bg-gray-200 rounded-lg dark:bg-gray-700 max-w-[300px] w-full mx-auto" />
        <div className="h-11 bg-gray-200 rounded-lg dark:bg-gray-700 max-w-[300px] w-full mx-auto" />
        <div className="h-11 bg-gray-200 rounded-lg dark:bg-gray-700 max-w-[300px] w-full mx-auto" />
      </>
    case "email":
      return <div className="h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 max-w-[160px] mb-7 mx-auto" />
    case "name":
      return <div className="h-5 bg-gray-200 rounded-lg dark:bg-gray-700 w-32 mb-4" />
    case "fullname":
      return ""
  }
}

export default DataNotFoundPlaceholder
