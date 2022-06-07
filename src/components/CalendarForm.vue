<template>
  <div>
    <ValidationObserver ref="observer" v-slot="{ invalid }">
      <b-form @submit.prevent="onSubmit" novalidate>
        <b-form-group label="Name" label-for="name">
          <ValidationProvider name="name" rules="required" v-slot="{ errors }">
            <b-form-input
              :state="errors.length == 0"
              v-model="form.name"
              type="text"
              required
              placeholder="Name"
              name="name"
            ></b-form-input>
            <b-form-invalid-feedback :state="errors.length == 0"
              >Name is required</b-form-invalid-feedback
            >
          </ValidationProvider>
        </b-form-group>

        <b-form-group label="Description" label-for="Description">
          <ValidationProvider name="description" rules="required" v-slot="{ errors }">
            <b-form-input
              :state="errors.length == 0"
              v-model="form.description"
              type="text"
              required
              placeholder="Description"
              name="description"
            ></b-form-input>
            <b-form-invalid-feedback :state="errors.length == 0"
              >Description is required</b-form-invalid-feedback
            >
          </ValidationProvider>
        </b-form-group>

        <b-form-group label="Start" label-for="start">
          <ValidationProvider name="start" rules="required" v-slot="{ errors }">
            <VueCtkDateTimePicker
              input-class="form-control"
              :state="errors.length == 0"
              v-model="form.start"
              name="start"
            ></VueCtkDateTimePicker>
            <b-form-invalid-feedback :state="errors.length == 0"
              >Start is required</b-form-invalid-feedback
            >
          </ValidationProvider>
        </b-form-group>
        <b-form-group label="End" label-for="end">
          <ValidationProvider name="end" rules="required" v-slot="{ errors }">
            <VueCtkDateTimePicker
              input-class="form-control"
              :state="errors.length == 0"
              v-model="form.end"
              name="end"
            ></VueCtkDateTimePicker>
            <b-form-invalid-feedback :state="errors.length == 0"
              >End is required</b-form-invalid-feedback
            >
          </ValidationProvider>
        </b-form-group>
        <b-button type="submit" variant="primary">Save</b-button>
        <b-button type="button" variant="primary" @click="deleteEvent(form.id)"
          >Delete</b-button
        >
      </b-form>
    </ValidationObserver>
  </div>
</template>
<script>
import { requestsMixin } from "../mixins/requestsMixin";

import { ValidationProvider, extend, ValidationObserver } from "vee-validate";
import { required } from "@vee-validate/rules";
extend("required", required);
import VueCtkDateTimePicker from 'vue-ctk-date-time-picker';

import * as moment from "moment";
export default {
  components: {
    ValidationProvider,ValidationObserver,VueCtkDateTimePicker
  },
  name: "CalendarForm",
  props: {
    edit: Boolean,
    calendarEvent: Object,
  },
  mixins: [requestsMixin],
  data() {
    return {
      form: {},
    };
  },
  watch: {
    calendarEvent: {
      immediate: true,
      deep: true,
      handler(val, oldVal) {
        this.form = val || {};
      },
    },
  },
  methods: {
    async onSubmit() {
      const isValid = await this.$refs.observer.validate();
      if (!isValid) {
        return;
      }
      this.form.start = moment(this.form.start).format("YYYY-MM-DD HH:mm:ss");
      this.form.end = moment(this.form.end).format("YYYY-MM-DD HH:mm:ss");
      if (this.edit) {
        await this.editCalendar(this.form);
      } else {
        await this.addCalendar(this.form);
      }
      const response = await this.getCalendar();
      console.log('response',response)
      this.$store.commit("setEvents", response.data);
      this.$emit("eventSaved");
    },
    async deleteEvent(id) {
      await this.deleteCalendar(id);
      const response = await this.getCalendar();
      this.$store.commit("setEvents", response.data);
      this.$emit("eventSaved");
    },
  },
};
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
button {
  margin-right: 10px;
}
</style>
