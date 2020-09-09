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
  searchTerm: string = ''
  pageNumber: number = 0
  hasMore: boolean = false


  @Mutation
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  @Mutation
  setHasMore(hasMore: boolean) {
    this.hasMore = hasMore;
  }

  @Mutation
  setPageNumber() {
    this.pageNumber += 1
  }

  @Mutation
  setSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm
  }

  @Mutation
  setComics(comics: Comic[]) {
    this.comics = comics
  }

  @Mutation
  setMoreComics(comics: Comic[]) {
    // this.comics = [...this.comics, ...comics]
    this.comics = this.comics.concat(comics)
  }

  @Mutation
  setComic(comic: Comic) {
    this.comic = comic
  }

  @Action({ commit: 'setComics', rawError: true })
  async getComics() {
    const result: Comic[] | undefined = await api.fetchComics()
    return result
  }

  @Action({ commit: 'setComic', rawError: true })
  async loadComic(comicId: number) {
    const result: Comic | undefined = await api.fetchComic(comicId)

    return result
  }

  @Action({ commit: 'setComics', rawError: true })
  async searchComics(title: string) {
    this.context.commit('setLoading', true)
    // const result: Comic[] | undefined = await api.getSearchComics(title)
    const result = await api.getSearchComics(title)
    this.context.commit('setPageNumber', 0)
    this.context.commit('setSearchTerm', title)
    this.context.commit('setHasMore', result.total - (result.offset >=20 ? result.offset : result.count) > 0 ? true : false)
    this.context.commit('setLoading', false)

    const { results } = result

    return results as Comic[]
  }

  @Action({ commit: 'setMoreComics', rawError: true })
  async fetchMoreComics(title: string, pageNumber: number) {
    this.context.commit('setLoading', true)
    this.context.commit('setSearchTerm', title)
    this.context.commit('setPageNumber')

    // const result: Comic[] | undefined = await api.getSearchComics(title)
    const result = await api.getSearchMoreComics(title, this.pageNumber)
    this.context.commit('setHasMore', result.total - (result.offset >=20 ? result.offset : result.count) > 0 ? true : false)
    this.context.commit('setLoading', false)

    const { results } = result

    return results as Comic[]
  }

}

export default getModule(ComicsModule)

// new way of using Vuex modules, defining them like Typescript classes
