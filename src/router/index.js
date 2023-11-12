import { createRouter, createWebHistory } from "vue-router";
import { nextTick } from "vue";
import NotFound from "@/pages/NotFound.vue";
import CoachDetail from "@/pages/coaches/CoachDetail.vue";
import CoachesList from "@/pages/coaches/CoachesList.vue";
import CoachRegistration from "@/pages/coaches/CoachRegistration.vue";
import ContactCoach from "@/pages/requests/ContactCoach.vue";
import RequestsReceived from "@/pages/requests/RequestsReceived.vue";
import UserAuth from "@/pages/auth/UserAuth.vue";

const routes = [
  {
    path: "/",
    redirect: "/coaches",
  },
  {
    path: "/coaches",
    name: "coach_list",
    component: CoachesList,
    meta: {
      title: "Home",
    },
  },
  {
    path: "/coaches/:id",
    name: "coach_detail",
    component: CoachDetail,
    props: true,
    meta: {
      title: "Coach Detail",
    },
    children: [
      {
        path: "contact", // /coaches/c1/contact
        name: "contact",
        component: ContactCoach,
        meta: {
          title: "Contact Coach",
        },
      },
    ],
  },
  {
    path: "/register",
    name: "register",
    component: CoachRegistration,
    meta: {
      title: "Register",
    },
  },
  {
    path: "/requests",
    name: "requests",
    component: RequestsReceived,
    meta: {
      title: "Requests",
    },
  },

  {
    path: "/auth",
    name: "auth",
    component: UserAuth,
    meta: {
      title: "Login | Auth",
    },
  },

  {
    // path: "/:pathMatch(.*)*",
    path: "/:notFound(.*)*",
    name: "not_found",
    component: NotFound,
    meta: {
      title: "Not Found",
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.afterEach((to) => {
  nextTick(() => {
    document.title = to.meta.title || process.env.VUE_APP_DEFAULT_TITLE;
  });
});

export default router;
