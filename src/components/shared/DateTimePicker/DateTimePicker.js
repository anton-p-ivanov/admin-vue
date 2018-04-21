/* DateTime Picker types */
const DATETIME_PICKER_DATE = 'date';
const DATETIME_PICKER_TIME = 'time';
const DATETIME_PICKER_DATETIME = 'datetime';

// noinspection JSUnusedGlobalSymbols
export default {
    name: 'DateTimePicker',
    props: ['value'],
    data () {
        return {
            type: DATETIME_PICKER_DATETIME,
            locale: document.querySelector('html').getAttribute('lang') || 'en-US',
            date: new Date(),
            format: 'DD.MM.YYYY HH:mm',
            i18n: {
                'en-US': {
                    'WEEKDAYS': ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
                    'TODAY': 'Today',
                    'CLOSE': 'Close',
                    'CHOOSE_DATE': 'Choose date',
                    'CHOOSE_TIME': 'Choose time'
                },
                'ru-RU': {
                    'WEEKDAYS': ['В', 'П', 'В', 'С', 'Ч', 'П', 'С'],
                    'TODAY': 'Сегодня',
                    'CLOSE': 'Закрыть',
                    'CHOOSE_DATE': 'Выберите дату',
                    'CHOOSE_TIME': 'Выберите время'
                }
            }
        }
    },
    created () {
        if (typeof this.format === 'string') {
            this.format = this.format.split(' ');
            this.format = {
                'date': this.format[0],
                'time': this.format[1]
            }
        }

        this.$_date = {date: null, hours: '00', minutes: '00'};

        if (this.value && typeof this.value === 'string') {
            let date = new Date(this.value);

            if (!isNaN(date.getDate())) {
                this.$_date = {
                    date: [date.getFullYear(), ('00' + (date.getMonth() + 1)).slice(-2), ("00" + date.getDate()).slice(-2)].join('-'),
                    hours: date.getHours(),
                    minutes: date.getMinutes()
                };
            }
        }
    },
    mounted () {
        // Listening for click events
        this.$el.addEventListener('click', this.$_clickHandler);

        // Listening for `escape` key press to close picker
        document.addEventListener('keyup', this.$_keyUpHandler);
    },
    updated () {
        this.renderPicker();
    },
    methods: {
        show () {
            this.$_currentDate = this.date ? new Date(this.date) : new Date();
            this.$_selectedDate = this.$_currentDate;
            this.$_initialType = this.type;

            this.renderPicker();

            this.$el.classList.add('visible');
            document.body.classList.add('dt-picker_no-scroll');
        },

        hide () {
            this.$el.classList.remove('visible');
            document.body.classList.remove('dt-picker_no-scroll');
        },

        renderHeader () {
            return this.i18n[this.locale][this.type === DATETIME_PICKER_TIME ? 'CHOOSE_TIME' : 'CHOOSE_DATE'];
        },

        renderPicker () {
            this.$_month = this.$_currentDate.getMonth();
            this.$_year = this.$_currentDate.getFullYear();

            this.type === DATETIME_PICKER_TIME ?
                this.$_renderPicker_Time('am') :
                this.$_renderPicker_Date();
        },

        $_renderPicker_Date () {
            let body = this.$el.querySelector('.dt-picker__body');

            body.innerHTML = '';
            body.appendChild(this.$_renderPicker_Nav());
            body.appendChild(this.$_renderPicker_Calendar());
        },

        $_renderPicker_Time (ampm) {
            let body = this.$el.querySelector('.dt-picker__body');

            body.innerHTML = '';
            body.appendChild(this.$_renderPicker_Clock(ampm));
        },

        $_renderPicker_Nav () {
            let $prevButton = document.createElement('button'),
                $nextButton = document.createElement('button'),
                $title = document.createElement('div'),
                $nav = document.createElement('div');

            $nav.className = 'dt-nav';

            $prevButton.type = 'button';
            $prevButton.className = 'dt-nav__btn';
            $prevButton.dataset.picker = 'Prev';
            $prevButton.innerHTML = `<i class="mdi mdi-chevron-left"></i>`;

            $nextButton.type = 'button';
            $nextButton.className = 'dt-nav__btn';
            $nextButton.dataset.picker = 'Next';
            $nextButton.innerHTML = `<i class="mdi mdi-chevron-right"></i>`;

            $title.className = 'dt-nav__title';
            $title.innerText = this.$_currentDate.toLocaleString(this.locale, { 'month': 'long' }) + ', ' + this.$_currentDate.getFullYear();

            $nav.appendChild($prevButton);
            $nav.appendChild($title);
            $nav.appendChild($nextButton);

            return $nav;
        },

        $_renderPicker_Calendar () {
            let $calendar = document.createElement('table'),
                month = this.$_currentDate.getMonth(),
                year = this.$_currentDate.getFullYear(),
                firstDayOfMonth = (new Date(year, month, 1)).getDay(),
                lastDayOfMonth = (new Date(year, month + 1, 0)).getDay(),
                lastDateOfMonth = (new Date(year, month + 1, 0)).getDate();

            $calendar.className = "dt-calendar";

            this.$_month = month;
            this.$_year = year;

            let thead = document.createElement('thead'),
                tbody = document.createElement('tbody'),
                row = document.createElement('tr'),
                th;

            thead.appendChild(row);
            $calendar.appendChild(thead);
            $calendar.appendChild(tbody);

            for (let i = 0, wd = this.i18n[this.locale]['WEEKDAYS']; i < wd.length; i++) {
                th = document.createElement('th');
                th.innerText = wd[i];
                row.appendChild(th);
            }

            let i, j, temp = [], chunk = 7, days = [];

            if (firstDayOfMonth > 0) {
                let lastDateOfPreviousMonth = (new Date(year, month, 0)).getDate();
                for (i = firstDayOfMonth; i > 0; i--) {
                    days.push({
                        'text': lastDateOfPreviousMonth - i,
                        'class': 'disabled'
                    });
                }
            }

            for (i = 1; i <= lastDateOfMonth; i++) {
                let today = (i === this.$_currentDate.getDate()
                    && month === this.$_currentDate.getMonth()
                    && year === this.$_currentDate.getFullYear()),
                    selected = (i === this.$_selectedDate.getDate()
                        && month === this.$_selectedDate.getMonth()
                        && year === this.$_selectedDate.getFullYear()),
                    strDate = [year, ('00' + (month + 1)).slice(-2), ("00" + i).slice(-2)].join('-');

                days.push({
                    'text': `<a href="#" class="${selected ? 'selected' : null}" data-picker="Date" data-date="${strDate}">${i}</a>`,
                    'class': today ? 'today' : null,
                });
            }

            if (lastDayOfMonth < 7) {
                let firstDateOfNextMonth = (new Date(year, month + 1, 1)).getDate();
                for (i = 6, j = 0; i > lastDayOfMonth; i--) {
                    days.push({
                        'text': firstDateOfNextMonth + j,
                        'class': 'disabled'
                    });
                    j++;
                }
            }

            // Split days array into chunks by 7 items
            for (i = 0, j = days.length; i < j; i += chunk) {
                temp.push(days.slice(i, i + chunk));
            }

            days = temp;

            let $tr, $td;
            for (i = 0; i < days.length; i++) {
                $tr = document.createElement('tr');
                for (j = 0; j < days[i].length; j++) {
                    $td = document.createElement('td');
                    $td.classList.add(days[i][j].class || null);
                    $td.innerHTML = days[i][j].text;
                    $tr.appendChild($td);
                }
                $calendar.querySelector('tbody').appendChild($tr);
            }

            return $calendar;
        },

        $_renderPicker_Clock (ampm) {
            let $clock = document.createElement('div'),
                $hours = document.createElement('ul'),
                $minutes = document.createElement('div'),
                pm = (typeof ampm !== 'undefined') ? ampm === 'pm' : this.$_currentDate.getHours() > 12;

            $clock.className = 'dt-clock';
            $hours.className = 'dt-clock__hours';
            $minutes.className = 'dt-clock__minutes hidden';

            let i, j, $li;

            for (i = 0; i < 12; i++) {
                j = pm ? i + 12 : i;
                j = j < 23 ? j : -1;

                $li = document.createElement('li');
                $li.innerHTML = `<a href="#" data-picker="Hours" data-hours="${j + 1}">${j + 1}</a>`;
                $hours.appendChild($li);

                j = i * 5 + 5;
                j = j < 60 ? j : 0;

                $li = document.createElement('li');
                $li.innerHTML = `<a href="#" data-picker="Minutes" data-minutes="${j}">${j}</a>`;
                $minutes.appendChild($li);
            }

            $clock.appendChild($hours);
            $clock.appendChild($minutes);
            $clock.appendChild($minutes);
            $clock.appendChild(this.$_renderPicker_Time_Switch(pm));

            return $clock;
        },

        $_renderPicker_Time_Switch (pm) {
            let $switch = document.createElement('ul'), $li, className;

            $switch.className = 'dt-clock__switch';
            for (let i = 0, parts = ['am', 'pm']; i < parts.length; i++) {
                $li = document.createElement('li');
                className = (parts[i] === 'pm' && pm) || (parts[i] === 'am' && !pm) ? 'selected' : '';
                $li.innerHTML = `<a href="#" data-picker="Switch" data-switch="${parts[i]}" class="${className}">${parts[i]}</a>`;
                $switch.appendChild($li);
            }

            return $switch;
        },

        $_keyUpHandler (event) {
            if (event.keyCode === 27) {
                this.hide();
            }
        },

        $_clickHandler (event) {
            let target = event.target;

            while (target && target !== document) {
                if (target.dataset.picker) {
                    event.preventDefault();

                    this['$_clickHandler_' + target.dataset.picker](event);

                    if (['Hours', 'Switch'].indexOf(target.dataset.picker) === -1) {
                        this.renderPicker();
                    }

                    break;
                }
                else if (event.target === target && target.classList.contains('dt-picker')) {
                    this.hide();
                    break;
                }

                target = target.parentNode;
            }
        },

        $_clickHandler_Next () {
            this.$_currentDate = new Date(this.$_year, this.$_month + 1, 1);
        },

        $_clickHandler_Prev () {
            this.$_currentDate = new Date(this.$_year, this.$_month - 1, 1);
        },

        $_clickHandler_Today () {
            this.$_currentDate = new Date();
            this.type = DATETIME_PICKER_DATETIME;
        },

        $_clickHandler_Date (event) {
            let target = event.target;

            this.$_date.date = target.dataset.date;

            if (this.type === DATETIME_PICKER_DATE) {
                this.$_clickHandler_Close();
            }
            else {
                this.type = DATETIME_PICKER_TIME;
            }
        },

        $_clickHandler_Hours (event) {
            let target = event.target;

            target.classList.toggle('selected', true);
            this.$_date.hours = target.dataset.hours;

            while (target !== document) {
                if (target.tagName === 'UL') {
                    Array.prototype.map.call(target.querySelectorAll('.selected'), element => {
                        element.classList.toggle('selected', false);
                    });
                    break;
                }

                target = target.parentNode;
            }

            this.$el.querySelector('.dt-clock__minutes').classList.toggle('hidden', false);
        },

        $_clickHandler_Minutes (event) {
            this.$_date.minutes = event.target.dataset.minutes;
            this.$_clickHandler_Close();
        },

        $_clickHandler_Switch (event) {
            this.$_renderPicker_Time(event.target.dataset.switch);
        },

        $_clickHandler_Close () {
            let value = this.$_date.hours + ':' + this.$_date.minutes;

            if (this.$_initialType !== DATETIME_PICKER_TIME) {
                value = this.$_date.date + ' ' + value;
            }

            // Send selected date & time to parent component
            this.$emit('change', value);

            // Hide DateTimePicker
            this.hide();
        }
    }
}