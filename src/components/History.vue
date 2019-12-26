<template>
  <div>
    <v-card class="card">
      <v-row>
        <v-col>
          <h3>История болезней</h3>
          <v-data-table :headers="headers" :items="items" item-key="id" row @click:row="select">
            <template v-slot:item="props">
              <tr @click="select(props.item)" :class="{'active': props.item.id == (patient && patient.id)}">
                <td>{{props.item.diagnosis}}</td>
                <td>{{props.item.dateIn}}</td>
                <td>{{props.item.dateOut}}</td>
                <td>{{props.item.doctor}}</td>
              </tr>
            </template>
          </v-data-table>
        </v-col>
        <v-col>
          <h3>Выписка по болезни</h3>
          <v-form v-if="patient" class="form">
            <v-menu
              v-model="showDateInPicker"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="fdatein"
                  label="Дата поступления"
                  append-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker v-model="patient.dateIn" @input="showDateInPicker = false" locale="ru"></v-date-picker>
            </v-menu>
            <v-menu
              v-model="showDateOutPicker"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
            >
              <template v-slot:activator="{ on }">
                <v-text-field
                  v-model="patient.fdateout"
                  label="Дата выписки"
                  append-icon="mdi-calendar"
                  readonly
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                v-model="patient.dateOut"
                @input="showDateOutPicker = false"
                locale="ru"
              ></v-date-picker>
            </v-menu>
            <v-text-field
              v-model="patient.diagnosis"
              name="diagnosis"
              label="Диагноз"
              id="diagnosis"
            ></v-text-field>
            <v-textarea
              label="Жалобы и анамнез"
              name="symptoms"
              textarea
              auto-grow
              v-model="patient.symptoms"
            ></v-textarea>
            <v-textarea
              label="Лечение"
              name="treatment"
              auto-grow
              textarea
              v-model="patient.treatment"
            ></v-textarea>
            <v-text-field v-model="patient.work" name="work" label="Место работы" id="work"></v-text-field>
            <v-text-field
              v-model="patient.directFrom"
              name="directFrom"
              label="Кем направлен"
              id="directFrom"
            ></v-text-field>
            <v-text-field v-model="patient.doctor" name="doctor" label="Лечащий врач" id="doctor"></v-text-field>
          </v-form>
        </v-col>
      </v-row>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showDateInPicker: false,
      showDateOutPicker: false,
      patient: null,
      headers: [
        { text: "Диагноз", value: "diagnosis" },
        { text: "Д.Поступления", value: "dateIn" },
        { text: "Д.Выписки", value: "dateOut" },
        { text: "Врач", value: "doctor" }
      ],
      items: [
        {
          id: 1,
          symptoms:
            "Абдоминальная мигрень затрагивает около 2% детей. Характерно появление боли в центре живота",
          diagnosis: "Абдоминальная эпилепсия",
          work: "Офис X",
          directFrom: "Поликлиника 1",
          dateIn: new Date().toISOString().substr(0, 10),
          dateOut: null,
          doctor: "Форман"
        },
        {
          id: 2,
          diagnosis: "Абстинентный синдром",
          symptoms:
            "Говорить об абстинентном синдроме следует при остановке или сокращении потребления различных веществ (алкоголь, амфетамины, кокаин, никотин, опиаты, седалищные или снотворные вещества, транквилизаторы), которые приводят к поведенческим, психологическим и когнитивным изменениям. Большинство симптомов при этом заболевании противоположны тем, которые наблюдаются при отравлении теми же веществами.",
          work: "Офис Y",
          directFrom: "Поликлиника 2",
          dateIn: new Date().toISOString().substr(0, 10),
          dateOut: new Date().toISOString().substr(0, 10),
          doctor: "Чейз"
        },
        {
          id: 3,
          diagnosis: "Аритмия",
          symptoms:
            "В обычной жизни, когда с сердцем все в порядке, человек, как правило, не ощущает его биения, не воспринимает его ритма. А при появлении аритмии явно чувствуются перебои, замирание сердца либо резкое хаотическое сердцебиение.",
          work: "Офис Z",
          directFrom: "Поликлиника 3",
          dateIn: new Date().toISOString().substr(0, 10),
          dateOut: new Date().toISOString().substr(0, 10),
          doctor: "Камерон"
        }
      ]
    };
  },
  computed: {
    fdatein() {
      // eslint-disable-next-line
      console.log(this.patient);
      return this.patient.dateIn ? this.formatDate(this.patient.dateIn) : "-";
    },
    fdateout() {
      return this.patient.dateOut ? this.formatDate(this.patient.dateOut) : "-";
    }
  },
  methods: {
    formatDate(date) {
      if (!date) return null;

      const [year, month, day] = date.split("-");
      return `${month}/${day}/${year}`;
    },
    select(patient) {
      this.patient = patient;
    }
  },
  mounted() {
    this.patient = this.items[0];
  }
};
</script>

<style>
tbody tr {
  cursor: pointer !important;
}
.card {
  padding: 20px;
}
tr.active {
    background: #cfcfcf;
}
</style>