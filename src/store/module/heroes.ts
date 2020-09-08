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
  characters: Character[] = []
  character: Character = {}

  @Mutation
  setCharacters(characters: Character[]) {
    this.characters = characters
  }

  @Action({commit: 'setCharacters', rawError: true})
  async getCharacters() {
    const result: Character[] | undefined = await api.fetchCharacters()

    return result
  }

  @Mutation
  setCharacter(character: Character) {
    this.character = character
  }

  @Action({commit: 'setCharacter', rawError: true})
  async loadCharacter(characterId: number) {
    const result: Character | undefined = await api.fetchCharacter(characterId)

    return result
  }
}

export default getModule(HeroesModule)