import Media from './Media';
import { assert } from 'chai';

describe('Unit test rental_store/Media', () => {
  describe('When instatiating Media', () => {
    describe('Should return the given media id', () => {
      it('If involkes getIdMedia', () => {
        const media = new Media(94, 'Teste Media', 'Test', true);

        assert.equal(media.getIdMedia(), 94);
      });
    });

    describe('Should return the given title', () => {
      it('If involkes getTitle', () => {
        const media = new Media(94, 'Teste Media', 'Test', true);

        assert.equal(media.getTitle(), 'Teste Media');
      });
    });

    describe('Should return the given director', () => {
      it('If involkes getDirector', () => {
        const media = new Media(94, 'Teste Media', 'Test', true);

        assert.equal(media.getDirector(), 'Test');
      });
    });

    describe('Should return the given isRented state', () => {
      it('If involkes getIsRented', () => {
        const media = new Media(94, 'Teste Media', 'Test', true);

        assert.isTrue(media.getIsRented());
      });
    });
  });
});
