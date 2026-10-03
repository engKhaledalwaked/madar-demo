<script setup>
import { ref, reactive, computed, onMounted, onUnmounted } from 'vue'
import { t, tr, lang, toggleLang, img, site, wa, jobs, nations, skills } from './data'

const scrolled = ref(false)
const onScroll = () => { scrolled.value = window.scrollY > 30 }
onMounted(() => { onScroll(); window.addEventListener('scroll', onScroll, { passive: true }) })
onUnmounted(() => window.removeEventListener('scroll', onScroll))

// طلب الاستقدام
const f = reactive({ job: 'maid', nation: 'any', skills: [], name: '', phone: '', city: '' })
const err = ref('')
const toggleSkill = (id) => { const i = f.skills.indexOf(id); i > -1 ? f.skills.splice(i, 1) : f.skills.push(id) }
const pickJob = (id) => { f.job = id; document.getElementById('request')?.scrollIntoView({ behavior: 'smooth' }) }
const jobName = computed(() => tr(jobs.find((j) => j.id === f.job).t))
const nationName = computed(() => tr(nations.find((n) => n.id === f.nation).t))
const skillNames = computed(() => f.skills.map((s) => tr(skills.find((k) => k.id === s).t)))
const send = () => {
  if (!f.name.trim() || !f.phone.trim()) { err.value = t.value.req.required; return }
  err.value = ''
  const m = t.value.req.msg
  const lines = [m.hello, `${m.job}: ${jobName.value}`, `${m.nation}: ${nationName.value}`, skillNames.value.length ? `${m.skills}: ${skillNames.value.join('، ')}` : null, `${m.name}: ${f.name.trim()}`, `${m.phone}: ${f.phone.trim()}`, `${m.city}: ${f.city.trim() || t.value.req.cityDef}`].filter(Boolean)
  window.open(wa(lines.join('\n')), '_blank', 'noopener')
}

// رحلة الطلب
const step = ref(0)
const lift = (i, n) => Math.round(Math.sin((Math.PI * i) / (n - 1)) * 70)

// تابع طلبك
const tk = reactive({ contract: '', name: '' })
const tkErr = ref('')
const track = () => {
  if (!tk.contract.trim() || !tk.name.trim()) { tkErr.value = t.value.track.required; return }
  tkErr.value = ''
  const T = t.value.track
  window.open(wa([T.msg, `${T.mContract}: ${tk.contract.trim()}`, `${T.mName}: ${tk.name.trim()}`].join('\n')), '_blank', 'noopener')
}

const open = ref(0)
const year = new Date().getFullYear()
</script>

<template>
  <!-- نسخة عرض: احذف هذا الشريط عند الإطلاق الرسمي -->
  <div class="demo-ribbon">{{ t.ribbon }}</div>

  <header class="nav" :class="{ scrolled }">
    <div class="container nav-in">
      <a href="#top" class="logo" :aria-label="t.brand">
        <svg viewBox="0 0 64 48" aria-hidden="true"><path d="M4 38c12 8 40 4 54-22" class="orb" /><path d="M24 6l4.4 9 9.9 1.4-7.2 7 1.7 9.8L24 28.6l-8.8 4.6 1.7-9.8-7.2-7 9.9-1.4z" class="st" /><circle cx="52" cy="8" r="2.6" class="st" /><circle cx="58" cy="15" r="1.6" class="st" /></svg>
        <span><b>{{ t.brand }}</b><small>{{ t.brandSub }}</small></span>
      </a>
      <nav class="links"><a href="#services">{{ t.nav.services }}</a><a href="#journey">{{ t.nav.journey }}</a><a href="#track">{{ t.nav.track }}</a><a href="#faq">{{ t.nav.faq }}</a><a href="#visit">{{ t.nav.visit }}</a></nav>
      <div class="acts">
        <button type="button" class="lang" @click="toggleLang">{{ lang === 'ar' ? 'EN' : 'ع' }}</button>
        <a href="#request" class="btn btn-gold hide-sm">{{ t.nav.request }}</a>
      </div>
    </div>
  </header>

  <main>
    <section class="hero" id="top">
      <div class="sky" aria-hidden="true"></div>
      <div class="container hero-in">
        <div class="hero-copy">
          <p class="kicker">{{ t.hero.kicker }}</p>
          <h1><span>{{ t.hero.t1 }}</span><span>{{ t.hero.t2 }}</span><span class="gold">{{ t.hero.t3 }}</span></h1>
          <p class="lead">{{ t.hero.lead }}</p>
          <div class="ctas">
            <a href="#request" class="btn btn-gold">{{ t.hero.cta }}</a>
            <a href="#track" class="btn btn-ghost">{{ t.hero.track }}</a>
          </div>
          <ul class="badges">
            <li><b>★ {{ site.rating }}</b> {{ site.reviews }} {{ t.hero.rate }}</li>
            <li><b>✓</b> {{ t.hero.musaned }}</li>
          </ul>
        </div>
        <div class="hero-art">
          <svg class="ring" viewBox="0 0 400 400" aria-hidden="true"><ellipse cx="200" cy="200" rx="196" ry="120" transform="rotate(-24 200 200)" /><circle cx="372" cy="104" r="7" /><circle cx="40" cy="282" r="4" /></svg>
          <div class="arch"><img :src="img('storefront.jpg')" alt="" fetchpriority="high" /></div>
        </div>
      </div>
    </section>

    <section class="section services" id="services">
      <div class="container">
        <div class="head" v-reveal><p class="kicker">{{ t.services.kicker }}</p><h2>{{ t.services.title }}</h2></div>
        <div class="sv-grid">
          <button v-for="j in jobs" :key="j.id" type="button" class="sv" v-reveal @click="pickJob(j.id)">
            <span class="ic"><svg viewBox="0 0 24 24" aria-hidden="true"><path :d="j.icon" /></svg></span>
            <h3>{{ tr(j.t) }}</h3>
            <p>{{ tr(j.d) }}</p>
            <span class="go">{{ t.nav.request }} {{ lang === 'ar' ? '←' : '→' }}</span>
          </button>
        </div>
        <p class="note">{{ t.services.note }}</p>
      </div>
    </section>

    <section class="section request" id="request">
      <div class="container rq-in">
        <form class="rq-form" novalidate @submit.prevent="send" v-reveal>
          <p class="kicker">{{ t.req.kicker }}</p>
          <h2>{{ t.req.title }}</h2>
          <fieldset><legend><i>1</i>{{ t.req.s1 }}</legend>
            <div class="chips"><button v-for="j in jobs" :key="j.id" type="button" :class="{ on: f.job === j.id }" @click="f.job = j.id">{{ tr(j.t) }}</button></div>
          </fieldset>
          <fieldset><legend><i>2</i>{{ t.req.s2 }}</legend>
            <div class="chips"><button v-for="n in nations" :key="n.id" type="button" :class="{ on: f.nation === n.id }" @click="f.nation = n.id">{{ tr(n.t) }}</button></div>
          </fieldset>
          <fieldset><legend><i>3</i>{{ t.req.s3 }}</legend>
            <div class="chips"><button v-for="s in skills" :key="s.id" type="button" class="multi" :class="{ on: f.skills.includes(s.id) }" :aria-pressed="f.skills.includes(s.id)" @click="toggleSkill(s.id)">{{ tr(s.t) }}</button></div>
          </fieldset>
          <fieldset><legend><i>4</i>{{ t.req.s4 }}</legend>
            <div class="row3">
              <label><span>{{ t.req.name }}</span><input v-model="f.name" autocomplete="name" /></label>
              <label><span>{{ t.req.phone }}</span><input v-model="f.phone" type="tel" dir="ltr" autocomplete="tel" /></label>
              <label><span>{{ t.req.city }}</span><input v-model="f.city" :placeholder="t.req.cityDef" /></label>
            </div>
          </fieldset>
          <p v-if="err" class="err" role="alert">{{ err }}</p>
          <button class="btn btn-gold block" type="submit">{{ t.req.send }}</button>
        </form>
        <aside class="ticket" v-reveal>
          <p class="t-head">{{ t.req.summary }}</p>
          <svg viewBox="0 0 64 48" aria-hidden="true"><path d="M4 38c12 8 40 4 54-22" class="orb" /><path d="M24 6l4.4 9 9.9 1.4-7.2 7 1.7 9.8L24 28.6l-8.8 4.6 1.7-9.8-7.2-7 9.9-1.4z" class="st" /></svg>
          <dl>
            <div><dt>{{ t.req.s1 }}</dt><dd>{{ jobName }}</dd></div>
            <div><dt>{{ t.req.s2 }}</dt><dd>{{ nationName }}</dd></div>
            <div><dt>{{ t.req.s3 }}</dt><dd>{{ skillNames.length ? skillNames.join('، ') : '—' }}</dd></div>
            <div><dt>{{ t.req.name }}</dt><dd>{{ f.name || '—' }}</dd></div>
          </dl>
          <p class="t-foot">{{ t.brandEn }}</p>
        </aside>
      </div>
    </section>

    <section class="section journey" id="journey">
      <div class="sky" aria-hidden="true"></div>
      <div class="container">
        <div class="head" v-reveal><p class="kicker">{{ t.journey.kicker }}</p><h2>{{ t.journey.title }}</h2></div>
        <div class="orbit" v-reveal>
          <svg class="path" viewBox="0 0 1000 120" preserveAspectRatio="none" aria-hidden="true"><path d="M20 110 Q500 -60 980 110" /></svg>
          <button v-for="(s, i) in t.journey.steps" :key="i" type="button" class="node" :class="{ on: step === i, done: i < step }" :style="{ '--lift': lift(i, t.journey.steps.length) + 'px' }" @click="step = i">
            <span class="dot">{{ i + 1 }}</span><span class="lbl">{{ s.t }}</span>
          </button>
        </div>
        <div class="station" :key="step + lang">
          <p class="num">0{{ step + 1 }}</p>
          <div><h3>{{ t.journey.steps[step].t }}</h3><p>{{ t.journey.steps[step].d }}</p></div>
          <div class="need"><small>{{ t.journey.need }}</small><p>{{ t.journey.steps[step].n }}</p></div>
        </div>
      </div>
    </section>

    <section class="section track" id="track">
      <div class="container tk-in">
        <div v-reveal><p class="kicker">{{ t.track.kicker }}</p><h2>{{ t.track.title }}</h2><p class="lead">{{ t.track.lead }}</p></div>
        <form class="tk-form" novalidate @submit.prevent="track" v-reveal>
          <label><span>{{ t.track.contract }}</span><input v-model="tk.contract" dir="ltr" inputmode="numeric" /></label>
          <label><span>{{ t.track.name }}</span><input v-model="tk.name" autocomplete="name" /></label>
          <p v-if="tkErr" class="err" role="alert">{{ tkErr }}</p>
          <button class="btn btn-wine block" type="submit">{{ t.track.send }}</button>
        </form>
      </div>
    </section>

    <section class="section faq" id="faq">
      <div class="container faq-in">
        <div class="head" v-reveal><p class="kicker">{{ t.faq.kicker }}</p><h2>{{ t.faq.title }}</h2></div>
        <div class="acc">
          <div v-for="(q, i) in t.faq.items" :key="q.q" class="qa" :class="{ open: open === i }" v-reveal>
            <button type="button" :aria-expanded="open === i" @click="open = open === i ? -1 : i"><span>{{ q.q }}</span><i>+</i></button>
            <div class="ans" v-show="open === i"><p>{{ q.a }}</p></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section visit" id="visit">
      <div class="container vs-in">
        <div class="vs-card" v-reveal>
          <p class="kicker">{{ t.visit.kicker }}</p>
          <h2>{{ t.visit.title }}</h2>
          <p class="addr">{{ t.visit.addr }}</p>
          <dl><div v-for="h in t.visit.hours" :key="h.d"><dt>{{ h.d }}</dt><dd>{{ h.h }}</dd></div></dl>
          <div class="phones">
            <a :href="`tel:${site.phone.tel}`"><small>{{ t.visit.call }}</small><b dir="ltr">{{ site.phone.label }}</b></a>
            <a :href="`tel:${site.sign.tel}`"><small>{{ t.visit.sign }}</small><b dir="ltr">{{ site.sign.label }}</b></a>
          </div>
          <a class="btn btn-gold" :href="site.maps" target="_blank" rel="noopener">{{ t.visit.dir }}</a>
        </div>
        <div class="map" v-reveal><iframe :src="site.mapEmbed" title="Map" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>
      </div>
    </section>
  </main>

  <footer class="footer">
    <div class="container foot">
      <a href="#top" class="logo big">
        <svg viewBox="0 0 64 48" aria-hidden="true"><path d="M4 38c12 8 40 4 54-22" class="orb" /><path d="M24 6l4.4 9 9.9 1.4-7.2 7 1.7 9.8L24 28.6l-8.8 4.6 1.7-9.8-7.2-7 9.9-1.4z" class="st" /><circle cx="52" cy="8" r="2.6" class="st" /></svg>
        <span><b>{{ t.brand }}</b><small>{{ t.brandSub }}</small></span>
      </a>
      <small>© {{ year }} {{ t.footer.rights }} · <em>{{ t.footer.demo }}</em></small>
    </div>
  </footer>
  <div class="sticky">
    <a :href="`tel:${site.phone.tel}`">{{ t.sticky.call }}</a>
    <a href="#request" class="main">{{ t.sticky.req }}</a>
  </div>
</template>
