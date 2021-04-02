<script>

  /**
   * Companies component
   */
  export default {
    layout: 'horizontal',
    head() {
      return {
        title: `${this.title} | Payin Shop`,
      };
    },
    data() {
      return {
        sites: [],
        title: "Showroom",

      }
    },


    middleware: 'auth'
  };
</script>

<template>
  <div class="col-12"><h4 class="my-4">Samples</h4>
    <div class="card-deck">
      <div class="card"><img src="http://demo.posthemes.com/pos_ecolifedemo/images/furniture1.jpg" alt="Card image" class="card-img-top"><!---->
        <div class="card-body"><!----><!---->
          <h4 class="card-title"><h5 class="card-title">Card title</h5></h4>
          <p class="card-text">
          <p>This is a wider card with supporting text below as a natural lead-in to additional content. This content is
            a little bit longer.</p>
          <p>
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
          </p></div><!----><!---->
        <div class="row mb-3 ml-2 text-right">
          <button type="button" class="btn ml-1 btn-warning">Demo</button>
          <button type="button" class="btn ml-1 btn-primary">Create Store</button>
        </div>
      </div>
      <div class="card"><img src="http://demo.posthemes.com/pos_ecolifedemo/images/organic3.jpg" alt="Card image" class="card-img-top"><!---->
        <div class="card-body"><!----><!---->
          <h4 class="card-title"><h5 class="card-title">Card title</h5></h4>
          <p class="card-text">
          <p>This card has supporting text below as a natural lead-in to additional content.</p>
          <p>
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
          </p></div><!----><!---->
        <div class="row mb-3 ml-2 text-right">
          <button type="button" class="btn ml-1 btn-warning">Demo</button>
          <button type="button" class="btn ml-1 btn-primary">Create Store</button>
        </div>
      </div>
      <div class="card"><img src="http://demo.posthemes.com/pos_ecolifedemo/images/cosmetic4.jpg" alt="Card image" class="card-img-top"><!---->
        <div class="card-body"><!----><!---->
          <h4 class="card-title"><h5 class="card-title">Card title</h5></h4>
          <p class="card-text">
          <p>This is a wider card with supporting text below as a natural lead-in to additional content. This card has
            even longer content than the first to show that equal height action.</p>
          <p>
            <small class="text-muted">Last updated 3 mins ago</small>
          </p>
          </p></div><!----><!---->
        <div class="row mb-3 ml-2 text-right">
          <button type="button" class="btn ml-1 btn-warning">Demo</button>
          <button type="button" class="btn ml-1 btn-primary">Create Store</button>
        </div>
      </div>

    </div>
  </div>


</template>
