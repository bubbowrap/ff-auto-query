// fileUpload() {
//   console.log(this.newQuery.image)
//   const storageRef = firebase
//     .storage()
//     .ref(`${this.newQuery.image.name}`)
//     .put(this.newQuery.image)
//   storageRef.on(
//     `state_changed`,
//     snapshot => {
//       this.uploadValue =
//         (snapshot.bytesTransferred / snapshot.totalBytes) * 100
//     },
//     error => {
//       console.log(error.message)
//     },
//     () => {
//       this.uploadValue = 100
//       storageRef.snapshot.ref.getDownloadURL().then(url => {
//         this.newQuery.image = url
//         console.log(this.newQuery.image)
//       })
//     }
//   )
// },

// imageUpload: ({ commit }, query) => {
//   const storageRef = firebase
//     .storage()
//     .ref(`${query.image.name}`)
//     .put(query.image)
//   storageRef.on(`state_changed`, () => {
//     storageRef.snapshot.ref.getDownloadURL().then(url => {
//       query.image = url
//       console.log(query.image)
//     })
//   })
// },

// <!-- <v-file-input
// class="card-form-input"
// label="Query Image"
// filled
// style="overflow: hidden; text-overflow: ellipsis"
// dense
// prepend-icon="mdi-camera"
// accept="image/png, image/jpeg, image/bmp"
// v-model.lazy="cardQuery.image"
// @keydown.enter="editQuery"
// >
// <template v-if="cardQuery.image.length > 5" v-slot:selection
//   ><div
//     style="white-space: nowrap; overflow: hidden; text-overflow: ellipsis"
//   >
//     {{
//       cardQuery.image.length > 5
//         ? cardQuery.image
//         : 'Upload New File'
//     }}
//   </div></template
// >
// </v-file-input> -->
