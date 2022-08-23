import "./table.scss";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

const List = () => {
  const rows = [
    {
      id: 1143155,
      product: "Cách trồng xoài",
      img: "https://znews-photo.zingcdn.me/w660/Uploaded/sgorvz/2016_06_14/qua_xoai_2.jpg",
      customer: "John Smith",
      date: "1 March",
      method: "Cash on Delivery",
      status: "Approved",
    },
    {
      id: 2235235,
      product: "Cách trồng dương xỉ",
      img: "https://khbvptr.vn/wp-content/uploads/2020/09/cay-duong-xi-1-800x800.jpg",
      customer: "Michael Doe",
      date: "1 March",
      method: "Online Payment",
      status: "Pending",
    },
    {
      id: 2342353,
      product: "Cách trồng lan",
      img: "https://www.fao.org.vn/wp-content/uploads/2020/01/loai-hoa-lan-de-trong.jpg",
      customer: "John Smith",
      date: "1 March",
      method: "Cash on Delivery",
      status: "Pending",
    },
    {
      id: 2357741,
      product: "Cách trồng lúa",
      img: "https://free.vector6.com/wp-content/uploads/2021/05/PNG-0000002192-png-bong-lua.png",
      customer: "Jane Smith",
      date: "1 March",
      method: "Online",
      status: "Approved",
    },
    {
      id: 2342355,
      product: "Cánh trồng tràm",
      img: "https://hakufarm.vn/wp-content/uploads/2018/08/hinh-anh-la-hoa-cay-tram-gio.jpg",
      customer: "Harold Carol",
      date: "1 March",
      method: "Online",
      status: "Pending",
    },
  ];
  return (
    <TableContainer component={Paper} className="table">
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell className="tableCell">Tracking ID</TableCell>
            <TableCell className="tableCell">Product</TableCell>
            <TableCell className="tableCell">Customer</TableCell>
            <TableCell className="tableCell">Date</TableCell>
            <TableCell className="tableCell">Payment Method</TableCell>
            <TableCell className="tableCell">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.id}>
              <TableCell className="tableCell">{row.id}</TableCell>
              <TableCell className="tableCell">
                <div className="cellWrapper">
                  <img src={row.img} alt="" className="image" />
                  {row.product}
                </div>
              </TableCell>
              <TableCell className="tableCell">{row.customer}</TableCell>
              <TableCell className="tableCell">{row.date}</TableCell>
              <TableCell className="tableCell">{row.method}</TableCell>
              <TableCell className="tableCell">
                <span className={`status ${row.status}`}>{row.status}</span>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default List;
