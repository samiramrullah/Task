import { Card, Space } from 'antd';
import React from 'react'
import FeatherIcon from "feather-icons-react";
import { NavLink } from 'react-router-dom';
const Post = ({alldata,setVisible,setDeletePostId,setEditCardId,setIsAddEdit,setCheckIsedit}) => {
  return (
 <div
    style={{
      display: "flex",
      flexWrap: "wrap",
    }}
  >
    {alldata?alldata?.map((values, i) => (
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
            <h3>Email : {values.email}</h3>
          </NavLink>
        </Card>
      </Space>
    )):"No data available"}
  </div>
  )
}

export default Post