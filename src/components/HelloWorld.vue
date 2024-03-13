<script>
import { ref } from 'vue'
import Button from './ui/button/Button.vue'
import ThreadsView from './ThreadsView.vue'
import WebVulnerabilitiesView from './WebVulnerabilitiesView.vue'
import ExposedPortsView from './ExposedPortsView.vue'
import ExposedCards from './ExposedCards.vue'
import ExposedCredentials from './ExposedCredentials.vue'
import { useAuth0 } from '@auth0/auth0-vue'

export default {
  name: 'NavBar',
  async setup() {
    const auth0 = useAuth0()
    if (auth0.isLoading) {
      await new Promise((resolve) => setTimeout(resolve, 500))
    }
    if (!auth0.isAuthenticated.value && auth0.isLoading) {
      console.log('must login')
      auth0.loginWithRedirect()
    }
    console.log(auth0.isAuthenticated.value)
    if (auth0.isAuthenticated.value) {
      console.log('logged in')
    }
    return {
      isAuthenticated: auth0.isAuthenticated,
      isLoading: auth0.isLoading,
      user: auth0.user,
      logout() {
        auth0.logout({
          logoutParams: {
            returnTo: window.location.origin,
          },
        })
      },
    }
  },
}

const threadsView = ref(true)
const webVulnerabilitiesView = ref(false)
const exposedPortsView = ref(false)
const exposedCardsView = ref(false)
const exposedCredentialsView = ref(false)

function viewSelector(view) {
  if (view === 'threads') {
    threadsView.value = true
    webVulnerabilitiesView.value = false
    exposedPortsView.value = false
    exposedCardsView.value = false
    exposedCredentialsView.value = false
  } else if (view === 'webVulnerabilities') {
    threadsView.value = false
    webVulnerabilitiesView.value = true
    exposedPortsView.value = false
    exposedCardsView.value = false
    exposedCredentialsView.value = false
  } else if (view === 'exposedPorts') {
    threadsView.value = false
    webVulnerabilitiesView.value = false
    exposedPortsView.value = true
    exposedCardsView.value = false
    exposedCredentialsView.value = false
  } else if (view === 'exposedCards') {
    threadsView.value = false
    webVulnerabilitiesView.value = false
    exposedPortsView.value = false
    exposedCardsView.value = true
    exposedCredentialsView.value = false
  } else if (view === 'exposedCredentials') {
    threadsView.value = false
    webVulnerabilitiesView.value = false
    exposedPortsView.value = false
    exposedCardsView.value = false
    exposedCredentialsView.value = true
  }
}
</script>

<template>
  <div class="bg-[#F7F7FA]" v-if="isAuthenticated">
    <button
      data-drawer-target="default-sidebar"
      data-drawer-toggle="default-sidebar"
      aria-controls="default-sidebar"
      type="button"
      class="inline-flex items-center p-2 mt-2 ms-3 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
    >
      <span class="sr-only">Open sidebar</span>
      <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
        <path
          clip-rule="evenodd"
          fill-rule="evenodd"
          d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
        ></path>
      </svg>
    </button>

    <aside id="default-sidebar" class="fixed top-0 left-0 z-40 w-16 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
      <div class="h-full py-4 overflow-y-auto dark:bg-gray-800">
        <ul class="space-y-2 font-medium">
          <li>
            <a href="#" class="flex items-center p-2 text-gray-900 justify-center rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700 group">
              <img src="../assets/Double.png" alt="Anova" class="w-3 h-3" />
            </a>
          </li>
          <li>
            <a href="#" class="flex items-center p-2 border-l-4 border-l-[#6354CA] text-gray-900 dark:text-white dark:hover:bg-gray-700 group">
              <img src="../assets/Subtract.png" class="w-7 pl-2" />
            </a>
          </li>
          <li>
            <a v-on:click="logout()" class="cursor-pointer flex items-center p-3 text-gray-900 dark:text-white dark:hover:bg-gray-700 group">
              <img src="../assets/icon2.png" class="w-7 pl-2" />
            </a>
          </li>
        </ul>
      </div>
    </aside>

    <div class="p-4 sm:ml-20">
      <div class="p-4 rounded-lg">
        <div class="grid grid-cols-2 gap-4 mb-4">
          <div class="h-24">
            <div class="flex items-center gap-3">
              <img src="../assets/riscapta_violet.png" alt="Riscapta" class="w-5 h-5" />
              <p class="text-2xl font-semibold text-[#1f1f1f] dark:text-gray-500 font-ibm">Riscapta</p>
            </div>
          </div>
          <div class="flex justify-end h-24 rounded dark:bg-gray-800 gap-4 text-[#8E9099] text-sm">
            <div class="gap-3 flex">
              <img src="../assets/face.png" class="w-5 h-5" />
              <p class="">Alexys</p>
            </div>
            <p class="text-gray-500">example.com</p>
          </div>
        </div>

        <div class="flex gap-5 items-center justify-center mb-4 border-b rounded dark:bg-gray-800">
          <div v-if="threadsView" class="flex gap-3 items-center border-b-2 border-b-[#6354CA] pb-4 px-4 font-semibold text-[#6354CA]">
            <img src="../assets/phishing.png" alt="Anova" class="w-7" />
            <a>Phishing</a>
          </div>
          <div v-else v-on:click="viewSelector('threads')" class="cursor-pointer flex gap-3 items-center pb-4 px-4 font-semibold text-[#4C4E5B]">
            <img src="../assets/phishingicon_deselected.png" alt="Anova" class="w-7" />
            <a>Phishing</a>
          </div>
          <div v-if="webVulnerabilitiesView" class="flex gap-3 items-center border-b-2 border-b-[#6354CA] pb-4 px-4 font-semibold text-[#6354CA]">
            <img src="../assets/webvulnerabilities.png" alt="Anova" class="w-7" />
            <a>Web Vulnerabilities</a>
          </div>
          <div v-else v-on:click="viewSelector('webVulnerabilities')" class="cursor-pointer flex gap-3 items-center pb-4 px-4 font-semibold text-[#4C4E5B]">
            <img src="../assets/webvulnerabilities_deselected.png" alt="Anova" class="w-7" />
            <a>Web Vulnerabilities</a>
          </div>
          <div v-if="exposedPortsView" class="flex gap-3 items-center border-b-2 border-b-[#6354CA] pb-4 px-4 font-semibold text-[#6354CA]">
            <img src="../assets/ports.png" alt="Anova" class="w-7" />
            <a>Exposed Ports</a>
          </div>
          <div v-else v-on:click="viewSelector('exposedPorts')" class="cursor-pointer flex gap-3 items-center pb-4 px-4 font-semibold text-[#4C4E5B]">
            <img src="../assets/ports_deselected.png" alt="Anova" class="w-7" />
            <a>Exposed Ports</a>
          </div>
          <div v-if="exposedCredentialsView" class="flex gap-3 items-center border-b-2 border-b-[#6354CA] pb-4 px-4 font-semibold text-[#6354CA]">
            <img src="../assets/duck.svg" alt="Anova" class="w-7" />
            <a>Exposed Credentials</a>
          </div>
          <div v-else v-on:click="viewSelector('exposedCredentials')" class="cursor-pointer flex gap-3 items-center pb-4 px-4 font-semibold text-[#4C4E5B]">
            <img src="../assets/duck.svg" alt="Anova" class="w-7" />
            <a>Exposed Credentials</a>
          </div>
          <div v-if="exposedCardsView" class="flex gap-3 items-center border-b-2 border-b-[#6354CA] pb-4 px-4 font-semibold text-[#6354CA]">
            <img src="../assets/duck.svg" alt="Anova" class="w-7" />
            <a>Exposed Cards</a>
          </div>
          <div v-else v-on:click="viewSelector('exposedCards')" class="cursor-pointer flex gap-3 items-center pb-4 px-4 font-semibold text-[#4C4E5B]">
            <img src="../assets/duck.svg" alt="Anova" class="w-7" />
            <a>Exposed Cards</a>
          </div>
        </div>
        <div class="grid grid-cols-3 gap-4 mb-4 font-medium">
          <div class="items-center justify-center rounded-xl bg-[#FCFCFC] h-28 dark:bg-gray-800 grid grid-cols-3 px-3">
            <div class="flex flex-col items-center justify-center">
              <div>
                <p class="text-2xl text-[#232A45] dark:text-gray-500">$83.564,14</p>
                <p class="text-md text-[#A1A6B5] dark:text-gray-500">Total Spend</p>
              </div>
            </div>
            <div class="flex items-center justify-center">
              <div>
                <p class="text-2xl text-[#232A45] dark:text-gray-500">$234.5K</p>
                <p class="text-md text-[#A1A6B5] dark:text-gray-500">Total *Value*</p>
              </div>
            </div>
            <div class="flex items-center justify-center">
              <div>
                <p class="text-2xl text-[#232A45] dark:text-gray-500">$1.2M</p>
                <p class="text-md text-[#A1A6B5] dark:text-gray-500">Total</p>
              </div>
            </div>
          </div>
          <div class="items-center justify-center rounded bg-[#FCFCFC] h-28 dark:bg-gray-800 grid grid-cols-2">
            <div class="flex flex-col items-center justify-center">
              <div>
                <p class="text-2xl text-[#232A45] dark:text-gray-500">1,022</p>
                <p class="text-md text-[#A1A6B5] dark:text-gray-500">Total SignUps</p>
              </div>
            </div>
            <div class="flex items-center justify-center">
              <div>
                <p class="text-2xl text-[#232A45] dark:text-gray-500">223</p>
                <p class="text-md text-[#A1A6B5] dark:text-gray-500">Total FTNs</p>
              </div>
            </div>
          </div>
          <div class="items-center justify-center rounded bg-[#FCFCFC] h-28 dark:bg-gray-800 grid grid-cols-2">
            <div class="flex flex-col items-center justify-center">
              <div>
                <p class="text-2xl text-[#232A45] dark:text-gray-500">94</p>
                <p class="text-md text-[#A1A6B5] dark:text-gray-500">Est. Late Conv.</p>
              </div>
            </div>
            <div class="flex items-center justify-center">
              <div>
                <div class="flex items-center gap-2">
                  <p class="text-2xl text-[#232A45] dark:text-gray-500">8,3%</p>
                  <div class="px-3 py-1 bg-[#F0F2FC] rounded-full">
                    <p class="text-xs text-[#6354CA] font-bold">High</p>
                  </div>
                </div>
                <p class="text-md text-[#A1A6B5] dark:text-gray-500">Predicted % VIP</p>
              </div>
            </div>
          </div>
        </div>
        <Suspense>
          <ThreadsView v-if="threadsView" />
        </Suspense>
        <Suspense>
          <WebVulnerabilitiesView v-if="webVulnerabilitiesView" />
        </Suspense>
        <Suspense>
          <ExposedPortsView v-if="exposedPortsView" />
        </Suspense>
        <Suspense>
          <ExposedCards v-if="exposedCardsView" />
        </Suspense>
        <Suspense>
          <ExposedCredentials v-if="exposedCredentialsView" />
        </Suspense>
      </div>
    </div>
  </div>
</template>
