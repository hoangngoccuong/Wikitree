// import "./datable.scss";
import { DataGrid } from "@mui/x-data-grid";
import { Link } from "react-router-dom";
import { useState } from "react";
import { supabase } from '../client';
import { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Navbar from "../components/navbar/Navbar";

import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import DialogTitle from '@mui/material/DialogTitle';


const Author = () => {

    const [data, setData] = useState([]);
    const [lis, setlist] = useState([])
    const [Publish, setPublish] = useState([])
    const [post, setPost] = useState({ Idtree: "",View: "", Author: "", Writedate: "", Idwrite: "" })
    const [Image, setImage] = useState()
    const [avatarUrl, setAvatatUrl] = useState("")
    const { Idtree, View, Author, Writedate, Idwrite} = post
    const [open, setOpen] = useState(false)

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        posts();
        list();
    }, [])

    const posts = async () => {
        const { data } = await supabase
            .from("Introduction")
            .select('*,Writedetails(Idwrite,Contentitle),Tree(*)')
        console.log(data)
        setData(data)
    }
    async function list() {
        const { data } = await supabase
            .from("Writedetails")
            .select('*')
        setlist(data)
        
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        let avatarUrl = ""
        console.log(Image)
        if (Image) {
            const { data, error } = await supabase.storage.from("Image").upload(`${Date.now()}_${Image.name}`, Image)
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
            .from('Introduction')
            .insert([{ Idtree, View, Author, Writedate, Idwrite }])
            .single()
        setPost({ Idtree: "", View: "", Author: "", Writedate: "", Idwrite: ""})
        posts()
        if (error) {
            console.log("Lỗi")
            alert("Thêm không thành công !")
            return
        }
        alert("Thêm thành công !")

    }
    const remove = async (id) => {
        const { error } = await supabase
            .from('Introduction')
            .delete()
            .match({ Idintroduction: id })

        if (error) {
            console.log("lỗi")
            alert("Không thể xóa lỗi khóa ngoại ! ")
            return
        }

        posts()
    }
    const rows = data.map((post) => ({
        id: post.Idintroduction,
        Idtree: post.Tree.Nametree,
        View: post.View,
        Author: post.Author,
        Writedate: post.Writedate,
        Idwrite: post.Writedetails.Contentitle
    }));

    const Columns = [

        { field: 'id', headerName: "ID", width: 70, height: 100 },
        { field: 'Idtree', headerName: "Tên cây ", width: 200, editable: true },
        { field: 'View', headerName: "Lượt xem", width: 150, editable: true },
        { field: 'Author', headerName: "Người viết", width: 200, editable: true },
        { field: 'Writedate', headerName: "Ngày viết", width: 150, editable: true },
        { field: 'Idwrite', headerName: "Nội dung bài viết", width: 500, editable: true }];


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
                            {/* <div className="bottom">
                                <div className="left">
                                    <img
                                        src={
                                            Image
                                                ? URL.createObjectURL(Image)
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
                            </div> */}
                            <div className='card-body'>

                                <div className="row" >

                                    <div className="form-group " >
                                        <label className="required">Số lượng người xem</label>
                                        <input type="text" className="form-control "
                                            value={View}
                                            onChange={e => setPost({ ...post, View: e.target.value })}></input>
                                    </div>
                                   
                                    <div className="form-group " style={{ marginTop: 20 }}>
                                        <label className="required">Chọn loại cây</label>
                                        <select className='form-control' onChange={(e) => { setPost({ ...post, Idtree: e.target.value }) }}>
                                            <option >- Chọn - </option>
                                            {
                                                data.map((post) => (
                                                    <option value={post.Idtree} key={post.id}>{post.Nametree} </option>))
                                            }
                                        </select>
                                    </div>
                                    <div className="form-group " style={{ marginTop: 20 }}>
                                        <label className="required">Nội dung bài viết</label>
                                        <input className='form-control' onChange={(e) => { setlist({ ...lis, Contentitle: e.target.value }) }}>
                                           
                                        </input>
                                    </div>

                                    <div className="form-group " style={{ marginTop: 20 }}>
                                        <label className="required">Nhập tác giả </label>
                                        <input type="text" className="form-control "
                                            value={Author}
                                            onChange={e => setPost({ ...post, Author: e.target.value })}></input>
                                    </div>
                                    <div className="form-group " style={{ marginTop: 20 }}>
                                        <label className="required">Nhập ngày viết bài </label>
                                        <input type="text" className="form-control "
                                            value={Writedate}
                                            onChange={e => setPost({ ...post, Writedate: e.target.value })}></input>
                                    </div>

                                    {/* <div class="form-group">
                                        <label for="exampleFormControlTextarea1" style={{ marginTop: 10 }}>Nhập mô tả</label>
                                        <textarea class="form-control" id="exampleFormControlTextarea1" rows="4"
                                            value={Describe}
                                            onChange={e => setPost({ ...post, Describe: e.target.value })}></textarea>
                                    </div> */}

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

export default Author;
