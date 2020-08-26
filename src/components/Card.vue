<template>
  <v-col cols="12" md="6">
    <v-card>
      <div class="d-flex flex-no-wrap justify-space-between">
        <div>
          <v-card-title v-text="query.title"></v-card-title>

          <v-card-subtitle v-text="query.category"></v-card-subtitle>
          <v-card-text>
            <v-btn outlined color="primary" :href="query.link">
              Read Now
              <v-icon>mdi-chevron-right</v-icon>
            </v-btn>
          </v-card-text>
        </div>

        <v-avatar class="ma-3" size="125" tile>
          <v-img :src="query.image"></v-img>
        </v-avatar>
      </div>
      <v-card-actions>
        <v-btn icon><v-icon>mdi-heart</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-pencil</v-icon></v-btn>
        <v-btn icon><v-icon>mdi-delete</v-icon></v-btn>

        <v-spacer></v-spacer>

        <v-btn text @click="show = !show" v-if="query.description">
          Details
          <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
        </v-btn>
      </v-card-actions>

      <v-expand-transition>
        <div v-show="show">
          <v-divider></v-divider>

          <v-card-text>
            {{ query.description }}
          </v-card-text>
        </div>
      </v-expand-transition>
    </v-card>
  </v-col>
</template>

<script>
export default {
  props: ['query'],
  data() {
    return {
      show: false,
    }
  },
}
</script>

<style lang="scss" scoped></style>
