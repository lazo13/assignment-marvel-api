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
  comics: Comic[] = [];
  comic: Comic = {};
  loading: boolean = false;
  searchTerm: string = '';
  pageNumber: number = 0;
  hasMore: boolean = false;


  @Mutation
  setLoading(loading: boolean) {
    this.loading = loading;
  }

  @Mutation
  setHasMore(hasMore: boolean) {
    this.hasMore = hasMore;
  }

  @Mutation
  setPageNumber(page: number) {
    this.pageNumber = page
  }

  @Mutation
  setSearchTerm(searchTerm: string) {
    this.searchTerm = searchTerm
  }

  @Mutation
  setComics(comics: Comic[]) {
    this.comics = this.comics.concat(comics)
  }

  @Mutation
  setComic(comic: Comic) {
    this.comic = comic
  }

  @Mutation
  setComicsClear(comics: Comic[]) {
    this.comics = comics;
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

  @Action({ commit: 'setComicsClear', rawError: true })
  clearComics() {
    const newComics: Comic[] = []
    return newComics
  }

  @Action({ commit: 'setComics', rawError: true })
  async searchComics({ title, page }: { title: string, page: number }) {
    this.context.commit('setLoading', true)
    this.context.commit('setSearchTerm', title)
    this.context.commit('setPageNumber', page)

    const result = await api.getSearchComics(title, page)

    this.context.commit('setHasMore', (result.offset + result.count) !== result.total ? true : false)
    this.context.commit('setLoading', false)

    const { results } = result

    return results as Comic[]
  }

}

export default getModule(ComicsModule)

// new way of using Vuex modules, defining them like Typescript classes
