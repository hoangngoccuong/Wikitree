// import "./datable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import DialogTitle from '@mui/material/DialogTitle';
import { supabase } from '../client';
import { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";


const IdPublish = () => {

    const [data, setData] = useState([]);
    const [post, setPost] = useState({ Idorder: "", Idcustomer: "", Idplantingtools: "",DateSetUp: "",TotalMoney: "" })
    const { Idorder, Idcustomer, Idplantingtools,DateSetUp ,TotalMoney } = post

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        publish();
    }, [])

    const publish = async () => {
        const { data } = await supabase
            .from("Order")
            .select('*, Plantingtools(*),Customer(*)')
        console.log(data)
        setData(data)
    }
    async function createPost() {
        const { error } = await supabase
            .from('Order')
            .insert([{ Idorder, Idcustomer, Idplantingtools ,DateSetUp ,TotalMoney }])
            .single()
        setPost({ Idorder: "", Idcustomer: "", Idplantingtools: "",DateSetUp: "",TotalMoney: "" })
        publish()
        if (error) {
            console.log("Lỗi")
            alert("Thêm không thành công !")
            return
        }
        alert("Thêm thành công !")

    }

    const remove = async (id) => {
        const { error } = await supabase
            .from('Order')
            .delete()
            .match({ Idorder: id })

        if (error) {
            console.log("lỗi")
            alert("Không thể xóa lỗi khóa ngoại ! ")
            return
        }

        publish()
    }

    const rows = data.map((post) => ({
        id: post.Idorder,
        Idcustomer: post.Customer.NameCustomer,
        Idplantingtools: post.Plantingtools.Nametool,
        DateSetUp: post.DateSetUp,
        TotalMoney: post.TotalMoney
    }));

    const Columns = [

        { field: 'id', headerName: "ID", width: 70, height: 100 },
        { field: 'Idcustomer', headerName: "Tên khách hàng", width: 200, editable: true },
        { field: 'Idplantingtools', headerName: "Tên dụng cụ mua", width: 150, editable: true },
        { field: 'DateSetUp', headerName: "Ngày mua hàng", width: 400, editable: true },
        { field: 'TotalMoney', headerName: "Tổng tiền", width: 150, editable: true }];


    const actionColumn = [
        {
            field: "action",
            headerName: "Action",
            width: 200,
            renderCell: (params) => {
                return (
                    <div className="cellAction">
                        <Link to="/users/test" style={{ textDecoration: "none" }}>
                            <div className="viewButton">View</div>
                        </Link>
                        <div
                            className="deleteButton"
                            onClick={() => { if (window.confirm("Bạn có muốn xóa không")) remove(params.row.id) }}
                        >
                            Delete
                        </div>
                    </div>
                );
            },
        },
    ];
    return (
        <div className="home">
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="Table">
                    <div className="TableTitle">
                        Quản lí đơn hàng
                        {/* <button onClick={handleClickOpen} className="link">
                            Thêm mới
                        </button> */}
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={rows}
                        columns={Columns.concat(actionColumn)}
                        pageSize={9}
                        rowsPerPageOptions={[9]}
                        checkboxSelection
                    />

                </div>
                <div>
                    {/* <Dialog open={open} onClose={handleClose}>
                        <DialogTitle>
                            Thêm nhà xuất bản
                        </DialogTitle>
                        <DialogContent>
                            <form >
                                <div className="row" >
                                    <div  >
                                        <div className="form-group ">
                                            <label className="required">Nhập lần tái bản</label>
                                            <input type="text" className="form-control "
                                                value={Republishment}
                                                onChange={e => setPost({ ...post, Republishment: e.target.value })}></input>
                                        </div>

                                        <div className="form-group " style={{ marginTop: 20 }}>
                                            <label className="required">Nhập năm tái bản</label>
                                            <input type="text" className="form-control "
                                                value={YearRepublishment}
                                                onChange={e => setPost({ ...post, YearRepublishment: e.target.value })}></input>
                                        </div>

                                        <div className="form-group " style={{ marginTop: 20 }}>
                                            <label className="required">Nhập nhà xuất bản</label>
                                            <input type="text" className="form-control "
                                                value={Publisher}
                                                onChange={e => setPost({ ...post, Publisher: e.target.value })}></input>
                                        </div>
                                    </div>



                                </div>


                            </form>
                        </DialogContent>
                        <DialogActions>
                            <div className='button'>
                                <button onClick={createPost} type="reset" value="Reset" className='btn btn-primary text-center'>Thêm</button>
                                <button onClick={() => setOpen(false)} className='btn btn-danger' type="reset" value="Reset" style={{ marginLeft: 20 }}>Đóng</button>
                            </div>

                        </DialogActions>

                    </Dialog> */}
                </div>
            </div>
        </div>
    );
};

export default IdPublish;
