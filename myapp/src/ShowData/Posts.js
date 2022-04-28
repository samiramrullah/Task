import React, { useEffect, useState } from "react";
import { Button, Card, Modal, Pagination, Space } from "antd";
import FeatherIcon from "feather-icons-react";
import axios from "axios";
import ModalWindow from "./ModelWindow";
import { NavLink } from "react-router-dom";
import "../../node_modules/bootstrap/dist/css/bootstrap.min.css";
import Post from "./Post";
const Posts = ({ userid }) => {
  const [deletePostId, setDeletePostId] = useState([]);
  const [visible, setVisible] = useState(false);
  const [checkIsEdit, setCheckIsedit] = useState(false);
  const [editCardId, setEditCardId] = useState([]);
  const [isAddEdit, setIsAddEdit] = useState(false);
  const [alldata, setalldata] = useState([]);
  const [currentPage, setcurrentPage] = useState(1);
  const [postPerPage, setPostPerPage] = useState(10);
  const [cardPagination, setCardPagination] = useState({
    minValue: 0,
    maxValue: 9,
  });
  useEffect(() => {
    fetch("http://localhost:9000/getlist")
      .then((res) => res.json())
      .then((data) => setalldata(data));
  }, []);

  const demo = () => {
    fetch("http://localhost:9000/getlist")
      .then((res) => res.json())
      .then((data) => setalldata(data));
  };

  const onCreate = (values) => {
    checkIsEdit ? UpdateData(values) : createNewOne(values);
    setIsAddEdit(false);
  };
  const UpdateData = (values) => {
    values.id = editCardId;
    axios.put("http://localhost:9000/updateById", values).then((res) => {
      console.log(res.data);
      demo();
    });

    setCheckIsedit(false);
  };
  const createNewOne = (values) => {
    console.log(typeof values.budget);
    console.log("update Firefdgdf");
    axios
      .post("http://localhost:9000/createuser", values)
      .then((res) => demo());
  };

  const deleteHandler = () => {
    axios
      .put(`http://localhost:9000/deletebyId/${deletePostId}`)
      .then((res) => {
        demo();
      });
  };

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;
  const currentPost = alldata.slice(indexOfFirstPost, indexOfLastPost);
  const paginate = (pageNumber) => {
    setcurrentPage(pageNumber);
  };
  const handleChange = (value) => {
    if (value <= 1) {
      setCardPagination({
        minValue: 0,
        maxValue: 9,
      });
    } else {
      setCardPagination({
        minValue: cardPagination.maxValue,
        maxValue: value * 9,
      });
    }
  };
  return (
    <>
      <Button style={{ margin: 20 }} onClick={() => setIsAddEdit(true)}>
        <strong>Add new</strong>
      </Button>

      <br />
      <Modal
        title="Delete Clinet Information"
        visible={visible}
        onOk={() => {
          console.log(deletePostId);
          deleteHandler();
          setVisible(false);
        }}
        onCancel={() => {
          setVisible(false);
        }}
      >
        <p>Do you really want to delete this clinet information?</p>
      </Modal>
      {/* <Post
        alldata={alldata}
        setCheckIsedit={setCheckIsedit}
        setDeletePostId={setDeletePostId}
        setEditCardId={setEditCardId}
        setVisible={setVisible}
        setIsAddEdit={setIsAddEdit}
      /> */}

      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {alldata
          ?.slice(cardPagination.minValue, cardPagination.maxValue)
          .map((values, i) => (
            <Space
              key={i}
              style={{
                width: "25%",
                padding: "8px",
              }}
            >
              <Card
                key={i}
                className="cards"
                hoverable
                actions={[
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "row",
                      justifyContent: "space-evenly",
                    }}
                  >
                    <FeatherIcon
                      icon="trash"
                      key="trash"
                      onClick={() => {
                        setDeletePostId(values.id);
                        setVisible(true);
                      }}
                      style={{
                        width: 20,
                        height: 20,
                      }}
                    />
                    &nbsp;&nbsp;
                    <FeatherIcon
                      icon="edit"
                      key="edit"
                      onClick={() => {
                        setEditCardId(values.id);
                        setIsAddEdit(true);
                        setCheckIsedit(true);
                      }}
                    />
                  </div>,
                ]}
              >
                <NavLink to={`/detail/${values.id}`}>
                  <h3>Name : {values.name}</h3>
                  <h3>Email : {values?.email}</h3>
                </NavLink>
              </Card>
            </Space>
          ))}
      </div>
      <div>
        <Pagination
          defaultCurrent={1}
          defaultPageSize={9}
          onChange={handleChange}
          total={alldata.length - 1}
        />
      </div>

      {isAddEdit && (
        <ModalWindow
          isAddEdit={isAddEdit}
          onCreate={onCreate}
          onCancel={() => {
            setIsAddEdit(false);
          }}
        />
      )}
    </>
  );
};

export default Posts;
