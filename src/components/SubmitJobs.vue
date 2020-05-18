<template>
    <div class="container">
        <div class="col-md-12">
            <h1>Upload to S3</h1>
        </div>
        <!--Below code will add a checkbox below the title. The information from the checkbox will be stored in a DynamoDB table.-->
        <!--<div class="col-md-12 text-center">-->
        <!--    <div class="form-group">-->
        <!--        <label>Generate point clouds</label><br>-->
        <!--        <input type="checkbox" v-model="Check the box if you like this page!">-->
        <!--    </div>-->
        <!--</div>-->
        <!--UPLOAD-->
        <div class="col-md-6 col-sm-12 offset-3">
            <form enctype="multipart/form-data" novalidate>
                <div class="dropbox">
                    <input type="file" multiple :name="uploadFieldName" :disabled="isSaving"
                           @change="addFiles($event.target.name, $event.target.files); fileCount = $event.target.files.length"
                           class="input-file">
                    <p v-if="isSaving">
                        Uploading {{ fileCount }} files...
                    </p>
                    <p v-else>
                        Drag your file(s) here to begin<br> or click to browse
                    </p>
                </div>
            </form>
        </div>
        <div class="col-md-12">
            <br>
            <div class="form-group">
                <button type="submit" class="btn btn-info" @click="submitJob">Upload</button>
            </div>
        </div>
    </div>
</template>

<script>
  import 'vue-loading-overlay/dist/vue-loading.css';

  const AWS = require('aws-sdk');
  const STATUS_SAVING = 1, STATUS_SUCCESS = 2, STATUS_FAILED = 3;

  export default {
    name: 'Upload to S3',
    mounted() {
      console.log('hello world')
    },
    data() {
      return {
        message: 'hello world',
        jobName: '',
        files: [],
        uploadedFiles: [],
        uploadError: null,
        currentStatus: 0,
        uploadFieldName: 'photos',
        panoramicImages: true,
        pointClouds: true,
        projectId: Math.random().toString(36).substr(2, 9)
      }
    },
    computed: {
      isSaving() {
        return this.currentStatus === STATUS_SAVING;
      },
      isSuccess() {
        return this.currentStatus === STATUS_SUCCESS;
      },
      isFailed() {
        return this.currentStatus === STATUS_FAILED;
      }
    },
    methods: {
      addFiles(fieldName, fileList) {
        // let _this = this;
        if (!fileList.length) return;
        console.log(fieldName)
        console.log(fileList)
        Array
          .from(Array(fileList.length).keys())
          .map(x => {
            console.log(fileList[x])
            this.files.push(fileList[x])
            console.log(`Added file ${fileList[x].name}`)
          });
      },
      submitJob() {
        var s3 = new AWS.S3();
        this.files.map(x => {
          console.log(x);
          var params = {
            Body: x,
            Bucket: "kia-random-storage",
            Key: `${x.name}/input/input.zip`,
          };
          s3.putObject(params, function (err, data) {
            if (err) console.log(err, err.stack); // an error occurred
            else console.log(data);           // successful response
          });
        })
      }
    }
  }
</script>

<style>
    .dropbox {
        outline: 2px dashed grey; /* the dash box */
        outline-offset: -10px;
        background: lightcyan;
        color: dimgray;
        padding: 10px 10px;
        min-height: 200px; /* minimum height */
        position: relative;
        cursor: pointer;
    }

    .input-file {
        opacity: 0; /* invisible but it's there! */
        width: 100%;
        height: 200px;
        position: absolute;
        cursor: pointer;
    }

    .dropbox:hover {
        background: lightblue; /* when mouse over to the drop zone, change color */
    }

    .dropbox p {
        font-size: 1.2em;
        text-align: center;
        padding: 50px 0;
    }
</style>
