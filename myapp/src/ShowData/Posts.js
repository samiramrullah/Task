import React, { useEffect, useState } from "react";
import { Button, Card, Input, Modal, Space } from "antd";
import { PlusSquareOutlined } from "@ant-design/icons";
import FeatherIcon from "feather-icons-react";
import axios from "axios";
import ModalWindow from "./ModelWindow";
import { NavLink } from "react-router-dom";

const Posts = ({ userid }) => {
  const [deletePostId, setDeletePostId] = useState([]);
  const [visible, setVisible] = useState(false);
  const [checkIsEdit, setCheckIsedit] = useState(false);
  const [editCardId, setEditCardId] = useState([]);
  const [isAddEdit, setIsAddEdit] = useState(false);
  const [alldata, setalldata] = useState([]);
  useEffect(() => {
    fetch("http://localhost:9000/getlist")
      .then((res) => res.json())
      .then((data) => setalldata(data));
  }, [alldata]);

  const onCreate = (values) => {
    checkIsEdit ? UpdateData(values) : createNewOne(values);
    setIsAddEdit(false);
  };
  const UpdateData = (values) => {
    values.id = editCardId;
    axios.put("http://localhost:9000/updateById", values).then((res) => {
      console.log(res.data);
    });

    setCheckIsedit(false);
  };
  const createNewOne = (values) => {
    console.log(typeof values.budget);
    axios
      .post("http://localhost:9000/createuser", values)
      .then((res) => console.log(res.data));
  };

  const deleteHandler = () => {
    axios
      .put(`http://localhost:9000/deletebyId/${deletePostId}`)
      .then((res) => {});
  };
  return (
    <>
    <Button style={{margin:20}} onClick={() => setIsAddEdit(true)}>
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
      <div  style={{
            display:"flex",
            flexWrap:"wrap",
          }}>
        {alldata?.map((values, i) => (
          <Space key={i} style={{
            width: "25%",
    padding: "8px",
          }}>
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
                <h3>Email : {values.email}</h3>
              </NavLink>
            </Card>
          </Space>
        ))}
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
