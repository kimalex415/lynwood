
uploadFile = loaded => {
    if (!this.isEmpty(loaded)) {
      const fd = new FormData();
      for (let i = 0; i < loaded.length; i++) {
        fd.append("file", loaded[i], loaded[i].name);
      }
      uploadFile(fd)
        .then(this.onFileUploadSuccess)
        .then(
          getAllPaginated(this.state.pageIndex, this.state.pageSize).then(
            this.onFilesSuccess
          )
        )

        .catch(this.onError);
    } else {
      swal({
        title: "Please choose a file",
        icon: "error",
        button: "Okay"
      });
    }
  };

//////////////////////////////////////////////////////////////////////////////////////////////////

const FileUpload = props => {
  const handlePost = () => {
    props.uploadFile(props.currentFile);
  };

  const loading = e => {
    props.loadFile(e.target.files);
  };

  return (
    <Card>
      <CardBody>
        <InputGroup>
          <CustomInput
            type="file"
            onInput={loading}
            onChange={handlePost}
            multiple
            id="file"
          />
        </InputGroup>
      </CardBody>
    </Card>
  );
};


