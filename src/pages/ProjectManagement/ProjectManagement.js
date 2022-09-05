import React, { useEffect, useState, useRef } from "react";
import { AutoComplete, Avatar, Button, Popover, Space, Table, Tag } from "antd";
import HTMLReactParser from "html-react-parser";
import { FormOutlined, DeleteOutlined } from "@ant-design/icons";
import { useSelector, useDispatch } from "react-redux";
import FormEditProject from "../../components/Forms/FormEditProject/FormEditProject";
import { message, Popconfirm } from "antd";
import { CloseCircleOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";

export default function ProjectManagement(props) {
  // Lấy dữ liệu từ reducer projectList
  const projectList = useSelector((state) => state.ProjectJiraReducer.projectList);

  const userSearch = useSelector((state) => state.UserLoginJiraReducer.userSearch);

  const [value, setValue] = useState("");

  const searchRef = useRef(null);

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
    // console.log("Various parameters", pagination, filters, sorter);
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
      render: (text, record, index) => {
        return <NavLink to={`/projectdetail/${record.id}`}>{text}</NavLink>;
      },
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

    {
      title: "Members",
      key: "members",
      render: (text, record, index) => {
        return (
          <div>
            {record.members?.slice(0, 3).map((member, index) => {
              return (
                <Popover
                  key={index}
                  placement="top"
                  title={"Member"}
                  content={() => {
                    return (
                      <table className="table table-hover">
                        <thead>
                          <tr key={index}>
                            <th>Id</th>
                            <th>Avatar</th>
                            <th>Name</th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {record.members?.map((item, index) => {
                            return (
                              <tr key={index}>
                                <td>{item.userId}</td>
                                <td>
                                  <img
                                    style={{ borderRadius: 100 }}
                                    width={30}
                                    height={30}
                                    alt=""
                                    src={item.avatar}
                                  />
                                </td>
                                <td>{item.name}</td>
                                <td>
                                  <Button
                                    onClick={() => {
                                      dispatch({
                                        type: "REMOVE_USER_PROJECT_API",
                                        userProject: {
                                          userId: item.userId,
                                          projectId: record.id,
                                        },
                                      });
                                    }}
                                    type="primary"
                                    danger
                                  >
                                    X
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    );
                  }}
                >
                  <Avatar key={index} src={member.avatar} />
                </Popover>
              );
            })}
            {record.members?.length > 3 ? <Avatar>...</Avatar> : ""}

            <Popover
              placement="rightTop"
              title={"Add member"}
              content={() => {
                return (
                  <AutoComplete
                    options={userSearch?.map((user, index) => {
                      return { label: user.name, value: user.userId.toString() };
                    })}
                    value={value}
                    onSelect={(valueSelect, option) => {
                      // set gia tri cua hop thoai = option.label
                      setValue(option.label);
                      // goi API gửi về backend
                      dispatch({
                        type: "ADD_USER_PROJECT_API",
                        userProject: {
                          projectId: record.id,
                          userId: valueSelect,
                        },
                      });
                    }}
                    onChange={(text) => {
                      setValue(text);
                    }}
                    style={{ width: "100%" }}
                    onSearch={(value) => {
                      if (searchRef.current) {
                        clearTimeout(searchRef.current);
                      }
                      searchRef.current = setTimeout(() => {
                        dispatch({
                          type: "GET_USER_API",
                          keyWord: value,
                        });
                      }, 300);
                    }}
                  />
                );
              }}
              trigger="click"
            >
              <Button shape="circle">+</Button>
            </Popover>
          </div>
        );
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
                title: "Edit Project",
                Component: <FormEditProject />,
              };
              // dispatch len reducer noi dung
              dispatch(action);
              // dispatch du lieu dong hien tai len reducer
              const actionEditProject = {
                type: "EDIT_PROJECT",
                projectEditModal: record,
              };
              dispatch(actionEditProject);
              console.log(actionEditProject);
            }}
            type="primary"
            icon={<FormOutlined />}
            size="default"
          />
          <Popconfirm
            title="Are you sure to delete this Project?"
            onConfirm={() =>
              dispatch({
                type: "DELETE_PROJECT_SAGA",
                idProject: record.id,
              })
            }
            okText="Yes"
            cancelText="No"
          >
            <Button type="danger" icon={<DeleteOutlined />} size="default" onClick={() => {}} />
          </Popconfirm>
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
