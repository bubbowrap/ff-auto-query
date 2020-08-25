<template>
  <div class="layout--default">
    <v-app-bar app dark>
      <div class="d-flex align-center">
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title class="ml-2">Fanfic Auto Query</v-toolbar-title>
      </div>
      <v-spacer></v-spacer>
      <v-btn
        href="https://github.com/vuetifyjs/vuetify/releases/latest"
        target="_blank"
        text
      >
        Sign In
      </v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app clipped>
      <v-list>
        <v-list-group
          v-for="item in items"
          :key="item.title"
          v-model="item.active"
          :prepend-icon="item.action"
          no-action
        >
          <template v-slot:activator>
            <v-list-item-content>
              <v-list-item-title v-text="item.title"></v-list-item-title>
            </v-list-item-content>
          </template>

          <v-list-item v-for="subItem in item.items" :key="subItem.title">
            <v-list-item-content>
              <v-list-item-title v-text="subItem.title"></v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container>
        <router-view></router-view>
        <v-btn fixed dark fab bottom right color="pink">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </v-container>
    </v-main>
  </div>
</template>

<script>
export default {
  data() {
    return {
      drawer: true,
      items: [
        {
          action: 'local_activity',
          title: 'Attractions',
          items: [{ title: 'List Item' }],
        },
        {
          action: 'restaurant',
          title: 'Dining',
          active: true,
          items: [
            { title: 'Breakfast & brunch' },
            { title: 'New American' },
            { title: 'Sushi' },
          ],
        },
        {
          action: 'school',
          title: 'Education',
          items: [{ title: 'List Item' }],
        },
        {
          action: 'directions_run',
          title: 'Family',
          items: [{ title: 'List Item' }],
        },
        {
          action: 'healing',
          title: 'Health',
          items: [{ title: 'List Item' }],
        },
        {
          action: 'content_cut',
          title: 'Office',
          items: [{ title: 'List Item' }],
        },
        {
          action: 'local_offer',
          title: 'Promotions',
          items: [{ title: 'List Item' }],
        },
      ],
    }
  },
}
</script>

<style lang="scss">
.template--default,
.v-main {
  //height: 100%;
  //min-height: 100vh;
}

.v-btn--bottom {
  bottom: 0;
}
</style>
