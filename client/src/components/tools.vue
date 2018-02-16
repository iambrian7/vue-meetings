<template>
    <div class="tools">
        <div class="aaflex-tools">
            <div class="aaflex-search">
                <button>Search</button>
                <input type="text">
            </div>
            <button @click="options = !options">Options</button>
            <div class="aaflex-tools-miles">
                <button @click="mileMax = 2" :class="{ active: mileMax == 2 }">Mile 2</button>
                <button @click="mileMax = 5" :class="{ active: mileMax == 5 }">Mile 5</button>
                <button @click="mileMax = 10" :class="{ active: mileMax == 10 }">Mile 10</button>
                <button @click="mileMax = 20" :class="{ active: mileMax == 20 }">Mile 20</button>
            </div>
            <div class="aaflex-tools-days">
                <button @click="day=0" :class="{ active: day == 0 }">Sun</button>
                <button @click="day=1" :class="{ active: day == 1 }">Mon</button>
                <button @click="day=2" :class="{ active: day == 2 }">Tue</button>
                <button @click="day=3" :class="{ active: day == 3 }">Wed</button>
                <button @click="day=4" :class="{ active: day == 4 }">Thr</button>
                <button @click="day=5" :class="{ active: day == 5 }">Fri</button>
                <button @click="day=6" :class="{ active: day == 6 }">Sat</button>
                <button @click="day=7" :class="{ active: day == 7 }">All</button>
            </div>
        </div>
        <div class="aaflex-options" v-if="options">
            <input type="radio" id="all" value= v-model="picked">
            <label for="all">All</label>
            <input type="radio" id="both" value="MW" v-model="picked">
            <label for="both">Men/Women</label>
            <input type="radio" id="one" value="M" v-model="picked">
            <label for="one">Men</label>
            <input type="radio" id="two" value="W" v-model="picked">
            <label for="two">Women</label>
            <select v-model="selected">
                <option disabled value=>Please select one</option>
                <option>A</option>
                <option>B</option>
                <option>C</option>
            </select>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'tools',
        props: ["meetings"],
        data() {
            return {
                options: false,
                picked: "" , // default to all meetings
                mileMax: 2,
                day: 0,
                selected: '',
            }
        },
        methods: {
            signUp: function (e) {
                console.log("signed up..................................")
            },
            mileLimit: function(m){
            return (this.mileMax > this.distance(this.lat,this.lng,m.loc.coordinates[1],m.loc.coordinates[0])) 
            },
            daycut: function(m){
            if (this.day == 7) return true; // just return all days
            return (this.day == m.day) 
            },
            distance: function(lat1, lon1, lat2, lon2, unit) {
            var radlat1 = Math.PI * lat1 / 180;
            var radlat2 = Math.PI * lat2 / 180;
            var radlon1 = Math.PI * lon1 / 180;
            var radlon2 = Math.PI * lon2 / 180;
            var theta = lon1 - lon2;
            var radtheta = Math.PI * theta / 180;
            var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
            dist = Math.acos(dist);
            dist = dist * 180 / Math.PI;
            dist = dist * 60 * 1.1515;
            if (unit === 'K') { dist = dist * 1.609344 };
            if (unit === 'N') { dist = dist * 0.8684 };
            return dist;
            }
        },
        newMeetings: function(){
            var self = this;

                var newMeetings = this.meetings.filter(function(m){
                    return ((self.mileLimit(m)) &&
                            (self.day == 7 || self.day == m.day) &&
                            (!self.picked || m.types.includes(self.picked))
                            )
                })
                newMeetings.sort(function (a, b) {
                        // ******************** first sort days
                        var nameA = a.day;
                        var nameB = b.day;
                        if (nameA < nameB) {
                        return -1;
                        }
                        if (nameA > nameB) {
                        return 1;
                        }
                        // *********************now sort times 
                        nameA = a.time
                        nameB = b.time
                        if (nameA < nameB) {
                        return -1;
                        }
                        if (nameA > nameB) {
                        return 1;
                        }
                        // names must be equal
                        return 0;
                });
            }
    }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
</style>