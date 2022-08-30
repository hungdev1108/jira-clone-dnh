import React, { useRef, useEffect } from "react";
import { Editor } from "@tinymce/tinymce-react";
import { connect, useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { withFormik } from "formik";
import { GET_ALL_PROJECT_CATEGORY_SAGA } from "../../../redux/constants/Jira/Jira";

function CreateProject(props) {
  const dispatch = useDispatch();
  const arrayProjectCategory = useSelector((state) => state.ProjectCategoryReducer.arrayProjectCategory);

  //   console.log("result", arrayProjectCategory);

  const { values, touched, errors, handleChange, handleBlur, handleSubmit, setFieldValue } = props;

  useEffect(() => {
    // Goi api de lay du lieu
    dispatch({
      type: GET_ALL_PROJECT_CATEGORY_SAGA,
    });
  }, []);

  //   const editorRef = useRef(null);
  const handleEditorChange = (content, editor) => {
    setFieldValue("description", content);
    // console.log(props);
  };

  return (
    <div className="container mt-3">
      <h3 className="text-center">Create Project</h3>
      <form style={{ paddingBottom: 20 }} onSubmit={handleSubmit} onChange={handleChange}>
        <div className="form-group">
          <p>Name</p>
          <input type="text" className="form-control" name="projectName" />
        </div>
        <div className="form-group">
          <p>Description</p>

          <Editor
            className="form-control"
            name="description"
            onEditorChange={handleEditorChange}
            init={{
              selector: "textarea#myTextArea",
              height: 400,
              menubar: false,
              statusbar: false,
              plugins: [
                "advlist autolink lists link image charmap print preview anchor",
                "searchreplace visualblocks code fullscreen",
                "insertdatetime media table paste code help wordcount",
              ],
              toolbar:
                "undo redo | formatselect | " +
                "bold italic backcolor | alignleft aligncenter " +
                "alignright alignjustify | bullist numlist outdent indent | " +
                "removeformat | help",
              content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
            }}
          />
        </div>
        <div className="form-group">
          <p>Project Category</p>
          <select name="categoryId" className="form-control" onChange={handleChange}>
            {arrayProjectCategory.map((item, index) => {
              return (
                <option value={item.id} key={index}>
                  {item.projectCategoryName}
                </option>
              );
            })}
          </select>
        </div>
        <button className="btn btn-outline-primary mt-3" type="submit">
          Create Project
        </button>
      </form>
    </div>
  );
}

const createProjectForm = withFormik({
  // Kích hoạt redux thay đổi binding lại dữ liệu của obj
  enableReinitialize: true,
  mapPropsToValues: (props) => {
    // console.log("Vles prop", props);
    return {
      projectName: "",
      description: "",
      categoryId: props.arrayProjectCategory[0]?.id,
    };
  },

  validationSchema: yup.object().shape({}),

  handleSubmit: (values, { props, setSubmitting }) => {
    props.dispatch({
      type: "CREATE_PROJECT_SAGA",
      newProject: values,
    });
  },
  displayName: "CreateProjectFormik",
})(CreateProject);

const mapStateToProps = (state) => ({
  arrayProjectCategory: state.ProjectCategoryReducer.arrayProjectCategory,
});

export default connect(mapStateToProps)(createProjectForm);
