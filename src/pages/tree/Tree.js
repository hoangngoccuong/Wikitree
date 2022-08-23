import "../../components/datatable/datatable.scss";
import { DataGrid } from "@mui/x-data-grid";
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import DialogTitle from '@mui/material/DialogTitle';
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from '../../client';
import { useEffect } from "react";
import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/navbar/Navbar";
import '../../components/datatable/datatable.scss'



function Datatable() {

    const [data, setData] = useState([]);
    const [plant, setPlantlist] = useState([])
    const [Type, setType] = useState([])
    const [Publish, setPublish] = useState([])
    const [post, setPost] = useState({ Nametree: "",Idplantlist: "", Pricetree: "", Careday: "", Describe: "" })
    const [text, setImage] = useState()
    const [avatarUrl, setAvatatUrl] = useState("")
    const { Nametree, Idplantlist, Pricetree, Careday, Describe} = post

    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        tree();
        plantlist();
        // type();
        // publish();
    }, [])

    const tree = async () => {
        const { data } = await supabase
            .from("Tree")
            .select('*,Plantlist(*)')
        console.log(data)
        setData(data)
    }
    async function plantlist() {
        const { data } = await supabase
            .from("Plantlist")
            .select('*')
        setPlantlist(data)
        
    }
    // async function type() {
    //     const { data } = await supabase
    //         .from("BookType")
    //         .select()
    //     setType(data)
    // }

    // async function publish() {
    //     const { data } = await supabase
    //         .from("Publish")
    //         .select()
    //     setPublish(data)
    // }

    const handleSubmit = async (e) => {
        e.preventDefault();
        let avatarUrl = ""
        if (text) {
            const { data, error } = await supabase.storage.from("avatars").upload(`${Date.now()}_${text.name}`, text)
            console.log(data)
            if (error) {
                alert("Chọn ảnh cây !")
                return
            }
            if (data) {
                setAvatatUrl(data.Key)
                avatarUrl = data.Key
            }
        }

        const { error } = await supabase
        // Image: avatarUrl
            .from('Tree')
            .insert([{ Nametree, Idplantlist, Pricetree, Careday, Describe,text: avatarUrl }])
            .single()
        setPost({ Nametree: "", Idplantlist: "", Pricetree: "", Careday: "", Describe: ""})
        tree()
        if (error) {
            console.log("Lỗi")
            alert("Thêm không thành công !")
            return
        }
        alert("Thêm thành công !")

    }

    // async function createPost() {
    //     const { error } = await supabase
    //         .from('Book')
    //         .insert([{ NameBook, IdAuthor, IdType, IdPublish, Price }])
    //         .single()
    //     setPost({ NameBook: "", IdAuthor: "", IdType: "", IdPublish: "", Price: "" })
    //     book()
    //     if (error) {
    //         console.log("Lỗi")
    //         alert("Thêm không thành công !")
    //         return
    //     }
    //     alert("Thêm thành công !")


    // }


    const remove = async (id) => {
        const { error } = await supabase
            .from('Tree')
            .delete()
            .match({ Idtree: id })

        if (error) {
            console.log("lỗi")
            alert("Không thể xóa lỗi khóa ngoại ! ")
            return
        }
        tree()
    }




    const rows = data.map((post) => ({
        id: post.Idtree,
        Nametree: post.Nametree,
        Nameplantlist: post.Plantlist.Nameplantlist,
        Pricetree: post.Pricetree,
        Careday: post.Careday,
        Describe: post.Describe
    }));

    const Columns = [

        { field: 'id', headerName: "ID", width: 70, height: 200 },
        { field: 'Nametree', headerName: "Tên loài cây", width: 200, editable: true },
        { field: 'Nameplantlist', headerName: "Tên loài cây", width: 200, editable: true },
        { field: 'Pricetree', headerName: "Giá cây", width: 200, editable: true },
        { field: 'Describe', headerName: "Mô tả", width: 400, editable: true },
        { field: 'Careday', headerName: "Ngày chăm sóc", width: 80, editable: true },
        // { field: 'Publisher', headerName: "Nhà xuất bản", width: 200, editable: true },
       ];


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
            {/* <Modal show={open}>
                <div>
                    fghjkl
                </div>

            </Modal> */}
            <Sidebar />
            <div className="homeContainer">
                <Navbar />
                <div className="Table">
                    <div className="TableTitle">
                        Thể loại cây
                        <button className="link" onClick={handleClickOpen}>
                            Thêm mới
                        </button>
                        {/* <Dialog2/> */}
                    </div>
                    <DataGrid
                        className="datagrid"
                        rows={rows}
                        columns={Columns.concat(actionColumn)}
                        pageSize={8}
                        rowsPerPageOptions={[9]}
                        checkboxSelection
                    />
                </div>
            </div>
            <div>
                <Dialog open={open} onClose={handleClose}>
                    <DialogTitle>
                        Thêm Cây
                    </DialogTitle>
                    <DialogContent>
                        <form >
                            <div className='row '>
                                <div className="bottom">
                                    <div className="left">
                                        <img
                                            src={
                                                text
                                                    ? URL.createObjectURL(text)
                                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                                            }
                                            alt=""
                                        />
                                    </div>
                                    <div className="right">
                                        <form>
                                            <div className="formInput">
                                                <label htmlFor="file">
                                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                                </label>
                                                <input
                                                    type="file"
                                                    id="file"
                                                    onChange={(e) => setImage(e.target.files[0])}
                                                    style={{ display: "none" }}
                                                />
                                            </div>
                                        </form>
                                    </div>
                                </div>
                                <div className='card-body'>

                                    <div className="row" >

                                        <div className="form-group " >
                                            <label className="required">Nhập tên cây</label>
                                            <input type="text" className="form-control "
                                                value={Nametree}
                                                onChange={e => setPost({ ...post, Nametree: e.target.value })}></input>
                                        </div>

                                        <div className="form-group " style={{ marginTop: 20 }}>
                                            <label className="required">Chọn loại cây</label>
                                            <select className='form-control' onChange={(e) => { setPost({ ...post, Idplantlist: e.target.value }) }}>
                                                <option >- Chọn - </option>
                                                {
                                                    plant.map((post) => (
                                                        <option value={post.Idplantlist} key={post.id}>{post.Nameplantlist} </option>))
                                                }
                                            </select>
                                        </div>

                                        <div className="form-group " style={{ marginTop: 20 }}>
                                            <label className="required">Nhập giá cây </label>
                                            <input type="text" className="form-control "
                                                value={Pricetree}
                                                onChange={e => setPost({ ...post, Pricetree: e.target.value })}></input>
                                        </div>

                                        <div className="form-group " style={{ marginTop: 20 }}>
                                            <label className="required">Nhập ngày chăm sóc </label>
                                            <input type="text" className="form-control "
                                                value={Careday}
                                                onChange={e => setPost({ ...post, Careday: e.target.value })}></input>
                                        </div>

                                        <div class="form-group">
                                            <label for="exampleFormControlTextarea1" style={{ marginTop: 10 }}>Nhập mô tả</label>
                                            <textarea class="form-control" id="exampleFormControlTextarea1" rows="4"
                                                value={Describe}
                                                onChange={e => setPost({ ...post, Describe: e.target.value })}></textarea>
                                        </div>

                                    </div>

                                </div>
                            </div>
                        </form>
                    </DialogContent>
                    <DialogActions>
                        <div className='button'>
                            <button onClick={handleSubmit} type="reset" value="Reset" className='btn btn-primary text-center'>Thêm</button>
                            <button onClick={() => setOpen(false)} className='btn btn-danger' type="reset" value="Reset" style={{ marginLeft: 20 }}>Đóng</button>
                        </div>

                    </DialogActions>

                </Dialog>
            </div>

        </div>
    );
};

export default Datatable;
