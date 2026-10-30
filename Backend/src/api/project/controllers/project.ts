import { factories } from '@strapi/strapi';

export default factories.createCoreController('api::project.project', ({ strapi }) => ({
  async create(ctx) {
    if (typeof ctx.request.body?.data === 'string') {
      try {
        ctx.request.body.data = JSON.parse(ctx.request.body.data);
      } catch (err) {
        strapi.log.error('Failed to parse multipart data payload:', err);
      }
    }
    return super.create(ctx);
  },
  async update(ctx) {
    if (typeof ctx.request.body?.data === 'string') {
      try {
        ctx.request.body.data = JSON.parse(ctx.request.body.data);
      } catch (err) {
        strapi.log.error('Failed to parse multipart data payload:', err);
      }
    }
    return super.update(ctx);
  },
}));
