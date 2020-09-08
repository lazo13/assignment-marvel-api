import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators'
import store from '@/store'
import * as api from '@/store/api'
import { Comic } from '@/store/models'

@Module({
  dynamic: true,
  namespaced: true,
  name: 'comics',
  store
})
class ComicsModule extends VuexModule {
  comics: Comic[] = []
  comic: Comic = {}
  loading: boolean = false

  @Mutation
  setComics(comics: Comic[]) {
    this.comics = comics
  }

  @Mutation
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  @Action({commit: 'setComics', rawError: true})
  async getComics() {
    const result: Comic[] | undefined = await api.fetchComics()
    return result
  }

  @Mutation
  setComic(comic: Comic) {
    this.comic = comic
  }

  @Action({ commit: 'setComic', rawError: true })
  async loadComic(comicId: number) {
    const result: Comic | undefined = await api.fetchComic(comicId)

    return result
  }

  @Action({commit: 'setComics', rawError: true})
  async searchComics(title: string) {
    this.context.commit('setLoading', true)
    const result: Comic[] | undefined = await api.getSearchComics(title)
    this.context.commit('setLoading', false)

    return result
  }

}

export default getModule(ComicsModule)

// new way of using Vuex modules, defining them like Typescript classes
