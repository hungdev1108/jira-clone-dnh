import React, { useEffect, useState } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { useDispatch, connect, useSelector } from "react-redux";
import { withFormik } from "formik";
import * as yup from "yup";
import { GET_ALL_PROJECT_CATEGORY_SAGA } from "../../../redux/constants/Jira/Jira";

function FormEditProject(props) {
  const [state, setState] = useState();
  const dispatch = useDispatch();
  const arrayProjectCategory = useSelector((state) => state.ProjectCategoryReducer.arrayProjectCategory);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = props;

  //   const submitFrom = (e) => {
  //     e.preventDefault();
  //     alert("Complete");
  //   };

  useEffect(() => {
    // Goi api de lay du lieu ve select option
    dispatch({
      type: GET_ALL_PROJECT_CATEGORY_SAGA,
    });
    // load su kien len drawer
    dispatch({
      type: "SET_SUBMIT_EDIT_PROJECT",
      submitFunction: handleSubmit,
    });
  }, []);

  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
    // console.log(props);
  };
  return (
    <form className="container" onSubmit={handleSubmit}>
      <div className="row">
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">ID</p>
            <input value={values.id} className="form-control" type="text" name="id" disabled />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Name</p>
            <input
              value={values.projectName}
              className="form-control"
              type="text"
              name="projectName"
              onChange={handleChange}
            />
          </div>
        </div>
        <div className="col-4">
          <div className="form-group">
            <p className="font-weight-bold">Project Category</p>
            <select
              name="categoryId"
              value={values.categoryId}
              className="form-control"
              onChange={handleChange}
            >
              {arrayProjectCategory?.map((item, index) => {
                return (
                  <option value={item.id} key={index}>
                    {item.projectCategoryName}
                  </option>
                );
              })}
            </select>
          </div>
        </div>

        <div className="col-12">
          <div className="form-group">
            <p className="font-weight-bold">Description</p>
            <Editor
              className="form-control"
              name="description"
              value={values.description}
              onEditorChange={handleEditorChange}
              init={{
                selector: "textarea#myTextArea",
                height: 500,
                menubar: false,
                statusbar: false,
                plugins: [
                  "advlist autolink lists link image charmap print preview anchor",
                  "searchreplace visualblocks code fullscreen",
                  "insertdatetime media table paste code help wordcount",
                  "textcolor",
                ],
                toolbar:
                  "undo redo styles bold italic forecolor backcolor numlist bullist alignleft aligncenter alignright code removeformat help" +
                  "alignright alignjustify | bullist numlist outdent indent help",
                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
              }}
            />
          </div>
        </div>
      </div>
    </form>
  );
}

const editProjectForm = withFormik({
  // Kích hoạt redux thay đổi binding lại dữ liệu của obj
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    const { projectEdit } = props;
    return {
      id: projectEdit?.id,
      projectName: projectEdit?.projectName,
      categoryId: projectEdit?.categoryId,
      description: projectEdit?.description,
    };
  },

  validationSchema: yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    // Khi nguoi dung bam sumbit => dua du lieu ve backend thong qua API
    const action = {
      type: "UPDATE_PROJECT_SAGA",
      projectUpdate: values,
    };
    // Goi saga
    props.dispatch(action);
  },
  displayName: "EditProjectFormik",
})(FormEditProject);

const mapStateToProps = (state) => ({
  projectEdit: state.ProjectEditReducer.projectEdit,
});

export default connect(mapStateToProps)(editProjectForm);
