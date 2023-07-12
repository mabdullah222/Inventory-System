
import AddProduct from "@/components/AddProduct/AddProduct"
import Search from "@/components/Search/Search"
import Inventory from "@/components/Inventory/Inventory"


export default function Home() {
  return (
    <div className="main">
      <Search></Search>
      <AddProduct></AddProduct>
      <Inventory></Inventory>
    </div>
  )
}
