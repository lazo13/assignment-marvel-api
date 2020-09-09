import { VuexModule, Module, getModule, Mutation, Action } from 'vuex-module-decorators'
import { Character } from '@/store/models'
import store from '@/store'
import * as api from '@/store/api'
@Module({
  dynamic: true,
  namespaced: true,
  name: 'heroes',
  store
})
class HeroesModule extends VuexModule {
  characters: Character[] = [];
  character: Character = {};
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
  setCharacters(characters: Character[]) {
    this.characters = this.characters.concat(characters)
  }

  @Mutation
  setCharacter(character: Character) {
    this.character = character
  }

  @Mutation
  setCharactersClear(characters: Character[]) {
    this.characters = characters;
  }

  @Action({ commit: 'setCharacters', rawError: true })
  async getCharacters() {
    const result: Character[] | undefined = await api.fetchCharacters()

    return result
  }

  @Action({ commit: 'setCharacter', rawError: true })
  async loadCharacter(characterId: number) {
    const result: Character | undefined = await api.fetchCharacter(characterId)
    return result
  }

  @Action({ commit: 'setCharactersClear', rawError: true })
  clearCharacters() {
    const newCharacters: Character[] = []
    return newCharacters
  }

  @Action({ commit: 'setCharacters', rawError: true })
  async searchCharacters({ name, page }: { name: string, page: number }) {
    this.context.commit('setLoading', true)
    this.context.commit('setSearchTerm', name)
    this.context.commit('setPageNumber', page)

    const result = await api.getSearchCharacters(name, page)

    this.context.commit('setHasMore', (result.offset + result.count) !== result.total ? true : false)
    this.context.commit('setLoading', false)

    const { results } = result

    return results as Character[]
  }
}

export default getModule(HeroesModule)