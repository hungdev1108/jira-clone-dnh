import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import HTMLReactParser from "html-react-parser";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import FormEditProject from "../../components/Forms/FormEditProject/FormEditProject";

export default function ProjectManagement(props) {
  // Lấy dữ liệu từ reducer projectList
  const projectList = useSelector((state) => state.ProjectJiraReducer.projectList);
  const dispatch = useDispatch();
  //   console.log("project list", projectList);
  const [state, setSate] = useState({
    filteredInfo: null,
    sortedInfo: null,
  });

  useEffect(() => {
    dispatch({
      type: "GET_LIST_PROJECT_SAGA",
    });
  }, []);

  const handleChange = (pagination, filters, sorter) => {
    console.log("Various parameters", pagination, filters, sorter);
    setSate({
      filteredInfo: filters,
      sortedInfo: sorter,
    });
  };

  const clearFilters = () => {
    setSate({
      filteredInfo: null,
    });
  };

  const clearAll = () => {
    setSate({
      filteredInfo: null,
      sortedInfo: null,
    });
  };

  const setAgeSort = () => {
    setSate({
      sortedInfo: {
        order: "descend",
        columnKey: "age",
      },
    });
  };

  let { sortedInfo, filteredInfo } = state;

  sortedInfo = sortedInfo || {};
  filteredInfo = filteredInfo || [];

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (item2, item1) => {
        return item2.id - item1.id;
      },
      sortDirections: ["descend"],
    },

    {
      title: "Project Name",
      dataIndex: "projectName",
      key: "projectName",
      sorter: (item2, item1) => {
        let projectName1 = item1.projectName?.trim().toLowerCase();
        let projectName2 = item2.projectName?.trim().toLowerCase();
        if (projectName2 < projectName1) {
          return -1;
        }
        return 1;
      },
    },

    {
      title: "Category Name",
      dataIndex: "categoryName",
      key: "categoryName",
      sorter: (item2, item1) => {
        let categoryName1 = item1.categoryName?.trim().toLowerCase();
        let categoryName2 = item2.categoryName?.trim().toLowerCase();
        if (categoryName2 < categoryName1) {
          return -1;
        }
        return 1;
      },
    },

    {
      title: "Creator",
      //   dataIndex: "creator",
      key: "creator",
      render: (text, record, index) => {
        return <Tag color="blue">{record.creator?.name}</Tag>;
      },
      sorter: (item2, item1) => {
        let creator1 = item1.creator?.name.trim().toLowerCase();
        let creator2 = item2.creator?.name.trim().toLowerCase();
        if (creator2 < creator1) {
          return -1;
        }
        return 1;
      },
    },

    // {
    //   title: "Description",
    //   dataIndex: "description",
    //   key: "description",
    //   render: (text, record, index) => {
    //     let jsxContent = HTMLReactParser(text);
    //     return <div key={index}>{jsxContent}</div>;
    //   },
    // },

    {
      title: "Action",
      key: "action",
      render: (text, record, index) => (
        <Space size="middle">
          <Button
            onClick={() => {
              const action = {
                type: "OPEN_FORM_EDIT_PROJECT",
                Component: <FormEditProject />,
              };
              // dispatch len reducer noi dung
              dispatch(action);
            }}
            type="primary"
            icon={<FormOutlined />}
            size="default"
          />
          <Button type="danger" icon={<DeleteOutlined />} size="default" />
        </Space>
      ),
    },
  ];

  return (
    <div className="container mt-3">
      <h3 className="text-center">Project Management</h3>
      <Space
        style={{
          marginBottom: 16,
        }}
      >
        <Button onClick={setAgeSort}>Sort age</Button>
        <Button onClick={clearFilters}>Clear filters</Button>
        <Button onClick={clearAll}>Clear filters and sorters</Button>
      </Space>
      <Table columns={columns} rowKey={"id"} dataSource={projectList} onChange={handleChange} />
    </div>
  );
}
